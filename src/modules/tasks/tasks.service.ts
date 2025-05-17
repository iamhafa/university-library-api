import { isEmpty } from 'lodash';
import { IsNull, LessThan } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BORROWING_STATUS, FINE_TICKET_STATUS } from '@/common/constants/enum';
import { BookBorrowingItemsRepository } from '../book-borrowing/repositories/book-borrowing-items.repository';
import { BookBorrowingRepository } from '../book-borrowing/repositories/book-borrowing.repository';
import { BookBorrowing } from '../book-borrowing/entities/book-borrowing.entity';
import { BookBorrowingItems } from '../book-borrowing/entities/book-borrowing-items.entity';
import { FineTicketRepository } from '../fine-ticket/repositories/fine-ticket.repository';
import { FineTicket } from '../fine-ticket/entities/fine-ticket.entity';

@Injectable()
export class TasksService {
  constructor(
    private readonly configService: ConfigService,
    private readonly fineTicketRepository: FineTicketRepository,
    private readonly bookBorrowingRepository: BookBorrowingRepository,
    private readonly bookBorrowingItemsRepository: BookBorrowingItemsRepository,
  ) {}

  private readonly logger = new Logger(TasksService.name);

  // Đồng bộ trạng thái của lượt mượn sách nếu quá hạn.
  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'syncOverdueBorrowingStatus' })
  async syncOverdueBorrowingStatus(): Promise<void> {
    this.logger.debug('Sync OVERDUE status for book borrowing if overdue...');

    const currentDate = new Date();
    const dueDateBorrowings: BookBorrowing[] = await this.bookBorrowingRepository.findBy({
      due_date: LessThan(currentDate),
      returned_date: IsNull(),
      status: BORROWING_STATUS.BORROWING,
    });

    if (!isEmpty(dueDateBorrowings)) {
      const dueDateBorrowingIds: number[] = dueDateBorrowings.map((borrowing) => borrowing.id);
      const updated: BookBorrowing[] = await this.bookBorrowingRepository.updateManyByIds(dueDateBorrowingIds, {
        status: BORROWING_STATUS.OVERDUE,
      });

      this.logger.warn(
        `Updated status from BORROWING to OVERDUE successfully for ${JSON.stringify(dueDateBorrowingIds)}: ${JSON.stringify(updated)}`,
      );
    } else {
      this.logger.debug(`No overdue book borrwowing.`);
    }
  }

  // Xử lý các lượt mượn sách bị quá hạn và tạo vé phạt nếu cần.
  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'generateFineForOverdueBorrowings' })
  async generateFineForOverdueBorrowings(): Promise<void> {
    this.logger.debug('Generate fine ticket when a book borrowing is overdue return...');

    // 1. Lấy ra danh sách các lượt mượn sách mà có trạng thái OVERDUE (quá hạn)
    const overdueBorrowings: BookBorrowing[] = await this.bookBorrowingRepository.findBy({
      returned_date: IsNull(),
      status: BORROWING_STATUS.OVERDUE,
    });

    if (!isEmpty(overdueBorrowings)) {
      // 2. Kiểm tra các cuốn sách của lượt mượn sách đó đã được trả hết chưa
      for (const overdueBorrowing of overdueBorrowings) {
        // 3. Liệt kê danh sách từng cuốn sách cho lượt mượn sách đó
        const overdueBorrowingItems: BookBorrowingItems[] = await this.bookBorrowingItemsRepository.findBy({
          book_borrowing_id: overdueBorrowing.id,
          returned_date: IsNull(),
        });

        // 4. Trường hợp có cuốn sách trong lượt mượn sách đó chưa trả
        if (!isEmpty(overdueBorrowingItems)) {
          // 5. Kiểm tra đã tồn tại vé phạt cho lượt mượn sách chưa trả đó chưa (với trạng thái đã bồi thường)
          const fineTicketBorrowing: FineTicket = await this.fineTicketRepository.findOneBy({
            book_borrowing_id: overdueBorrowing.id,
          });

          // 6. Trường hợp chưa có vé phạt cho lượt mượn sách mà đã quá hạn
          if (!fineTicketBorrowing) {
            // Tỉ lệ phạt (10%)
            const fineRatio: number = this.configService.get<number>('FINE_RATE');

            // 7. Tính tổng giá trị của các cuốn sách = giá * số lượng
            const totalPriceForAllItems: number = overdueBorrowingItems.reduce((sum: number, book: BookBorrowingItems) => {
              return sum + book.quantity * book.price;
            }, 0);

            // 8. Tạo vé phạt cho lượt mượn sách mà trả trễ hạn
            const fineOverdueBorrowing: FineTicket = await this.fineTicketRepository.save({
              total_fine_amount: totalPriceForAllItems * fineRatio, // Tổng giá * Tỉ lệ
              book_borrowing_id: overdueBorrowing.id,
              status: FINE_TICKET_STATUS.UNPAID, // Chưa trả tiền phạt
            });

            this.logger.warn(
              `Create fine ticket for Overdue book_borrowing_id ${overdueBorrowing.id} successfully: ${JSON.stringify(fineOverdueBorrowing)}`,
            );
          }
        }
      }
    }
  }

  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'syncBookBorrowingStatusAfterPaidFine' })
  async syncBookBorrowingStatusAfterPaidFine(): Promise<void> {
    this.logger.debug('Syncing Book borrowing status after paid the fine...');

    // 1. Liệt kê danh sách vé phạt nào đã được trả
    const paidFines: FineTicket[] = await this.fineTicketRepository.findBy({
      status: FINE_TICKET_STATUS.PAID,
    });

    // 2. Trường hợp có vé phạt
    if (!isEmpty(paidFines)) {
      for (const paidFine of paidFines) {
        // 3. Lấy ra lượt mượn sách mà đã được trả vé phạt
        const currentBookBorrowing: BookBorrowing = await this.bookBorrowingRepository.findOneBy({
          id: paidFine.book_borrowing_id,
        });

        // 4. Trường hợp status của lượt mượn sách đó là PAID_FINE (chưa trả)
        //  - Cập nhật thành status PAID_FINE
        //  - Cập nhật returned_date (ngày trả) là ngày đã thanh toán vé phạt
        if (currentBookBorrowing.status !== BORROWING_STATUS.PAID_FINE) {
          const bookBorrowingUpdated: BookBorrowing = await this.bookBorrowingRepository.updateOneById(paidFine.book_borrowing_id, {
            status: BORROWING_STATUS.PAID_FINE,
            returned_date: paidFine.payment_date,
          });

          this.logger.warn(`Updated book borrowing status to PAID_FINE after fine ticket paid fine: ${JSON.stringify(bookBorrowingUpdated)}.`);
        }
      }
    }
  }
}
