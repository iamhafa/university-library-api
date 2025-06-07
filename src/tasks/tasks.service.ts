import { isEmpty } from 'lodash';
import { IsNull, LessThan } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BORROWING_STATUS, FINE_TICKET_STATUS, JOB_NAME } from '@/common/constants/enum';
import { BookBorrowingItemsRepository } from '@/modules/borrowing/repositories/book-borrowing-items.repository';
import { BorrowingRepository } from '@/modules/borrowing/repositories/borrowing.repository';
import { Borrowing } from '@/modules/borrowing/entities/borrowing.entity';
import { BookBorrowingItems } from '@/modules/borrowing/entities/book-borrowing-items.entity';
import { FineTicketRepository } from '@/modules/fine-ticket/repositories/fine-ticket.repository';
import { FineTicket } from '@/modules/fine-ticket/entities/fine-ticket.entity';

@Injectable()
export class TasksService {
  constructor(
    private readonly configService: ConfigService,
    private readonly fineTicketRepository: FineTicketRepository,
    private readonly borrowingRepository: BorrowingRepository,
    private readonly bookBorrowingItemsRepository: BookBorrowingItemsRepository,
  ) {}
  private readonly logger = new Logger(TasksService.name);

  // Đồng bộ trạng thái của lượt mượn sách nếu quá hạn.
  @Cron(CronExpression.EVERY_10_SECONDS, { name: JOB_NAME.SYNC_OVERDUE_BORROWING_STATUS })
  async syncOverdueBorrowingStatus(): Promise<void> {
    this.logger.debug(JOB_NAME.SYNC_OVERDUE_BORROWING_STATUS);

    const currentDate = new Date();
    const dueDateBorrowings: Borrowing[] = await this.borrowingRepository.findBy({
      due_date: LessThan(currentDate),
      returned_date: IsNull(),
      status: BORROWING_STATUS.BORROWING,
    });

    if (!isEmpty(dueDateBorrowings)) {
      const dueDateBorrowingIds: number[] = dueDateBorrowings.map((borrowing) => borrowing.id);
      const updated: Borrowing[] = await this.borrowingRepository.updateManyByIds(dueDateBorrowingIds, {
        status: BORROWING_STATUS.OVERDUE,
      });

      this.logger.warn(
        `Updated status from BORROWING to OVERDUE successfully for ${JSON.stringify(dueDateBorrowingIds)}: ${JSON.stringify(updated)}`,
      );
    }
  }

  // Xử lý các lượt mượn sách bị quá hạn và tạo vé phạt nếu cần.
  @Cron(CronExpression.EVERY_10_SECONDS, { name: JOB_NAME.GENERATE_FINE_OVERDUE_BORROWING })
  async generateFineForOverdueBorrowing(): Promise<void> {
    this.logger.debug(JOB_NAME.GENERATE_FINE_OVERDUE_BORROWING);

    // 1. Lấy ra danh sách các lượt mượn sách mà có trạng thái OVERDUE (quá hạn)
    const overdueBorrowings: Borrowing[] = await this.borrowingRepository.findBy({
      returned_date: IsNull(),
      status: BORROWING_STATUS.OVERDUE,
    });

    if (!isEmpty(overdueBorrowings)) {
      // 2. Kiểm tra các cuốn sách của lượt mượn sách đó đã được trả hết chưa
      for (const overdueBorrowing of overdueBorrowings) {
        // 3. Liệt kê danh sách từng cuốn sách cho lượt mượn sách đó
        const overdueBorrowingItems: BookBorrowingItems[] = await this.bookBorrowingItemsRepository.findBy({
          borrowing_id: overdueBorrowing.id,
          returned_date: IsNull(),
        });

        // 4. Trường hợp có cuốn sách trong lượt mượn sách đó chưa trả
        if (!isEmpty(overdueBorrowingItems)) {
          // 5. Kiểm tra đã tồn tại vé phạt cho lượt mượn sách chưa trả đó chưa (với trạng thái đã bồi thường)
          const fineTicketBorrowing: FineTicket = await this.fineTicketRepository.findOneBy({
            borrowing_id: overdueBorrowing.id,
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
              borrowing_id: overdueBorrowing.id,
              status: FINE_TICKET_STATUS.UNPAID, // Chưa trả tiền phạt
            });

            this.logger.warn(
              `Create fine ticket for Overdue borrowing_id ${overdueBorrowing.id} successfully: ${JSON.stringify(fineOverdueBorrowing)}`,
            );
          }
        }
      }
    }
  }

  @Cron(CronExpression.EVERY_10_SECONDS, { name: JOB_NAME.SYNC_BORROWING_STATUS_AFTER_FINE })
  async syncBookBorrowingStatusAfterPaidFine(): Promise<void> {
    this.logger.debug(JOB_NAME.SYNC_BORROWING_STATUS_AFTER_FINE);

    // 1. Liệt kê danh sách vé phạt nào đã được trả
    const paidFines: FineTicket[] = await this.fineTicketRepository.findBy({
      status: FINE_TICKET_STATUS.PAID,
    });

    // 2. Trường hợp có vé phạt
    if (!isEmpty(paidFines)) {
      for (const paidFine of paidFines) {
        // 3. Lấy ra lượt mượn sách mà đã được trả vé phạt
        const currentBookBorrowing: Borrowing = await this.borrowingRepository.findOneBy({
          id: paidFine.borrowing_id,
        });

        // 4. Trường hợp status của lượt mượn sách đó là PAID_FINE (chưa trả)
        //  - Cập nhật thành status PAID_FINE
        //  - Cập nhật returned_date (ngày trả) là ngày đã thanh toán vé phạt
        if (currentBookBorrowing.status !== BORROWING_STATUS.PAID_FINE) {
          const bookBorrowingUpdated: Borrowing = await this.borrowingRepository.updateOneById(paidFine.borrowing_id, {
            status: BORROWING_STATUS.PAID_FINE,
            returned_date: paidFine.payment_date,
          });

          this.logger.warn(`Updated book borrowing status to PAID_FINE after fine ticket paid fine: ${JSON.stringify(bookBorrowingUpdated)}.`);
        }
      }
    }
  }
}
