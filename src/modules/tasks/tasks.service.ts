import { isEmpty } from 'lodash';
import { IsNull, LessThan } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { BORROWING_STATUS, FINE_TICKET_STATUS, JOB_NAME } from '@/common/constants/enum';
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
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly fineTicketRepository: FineTicketRepository,
    private readonly bookBorrowingRepository: BookBorrowingRepository,
    private readonly bookBorrowingItemsRepository: BookBorrowingItemsRepository,
  ) {}

  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_5_MINUTES, { name: JOB_NAME.BOOK_BORROWING })
  async handleDueDateBooks(): Promise<void> {
    this.logger.debug('Sync OVERDUE status for book borrowing if overdue');

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

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleFineOverdueBooks() {
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

            // Tính tổng giá trị của các cuốn sách = giá * số lượng
            const totalPriceForAllItems: number = overdueBorrowingItems.reduce((sum: number, book: BookBorrowingItems) => {
              return sum + book.quantity * book.price;
            }, 0);

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
}
