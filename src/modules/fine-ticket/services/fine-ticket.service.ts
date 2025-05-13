import { isEmpty } from 'lodash';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FINE_TICKET_STATUS, JOB_NAME } from '@/common/constants/enum';
import { FineTicketRepository } from '../repositories/fine-ticket.repository';
import { CreateFineTicketDto } from '../dto/create-fine-ticket.dto';
import { UpdateFineTicketDto } from '../dto/update-fine-ticket.dto';
import { FineTicket } from '../entities/fine-ticket.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';
import { BookBorrowingService } from '@/modules/book-borrowing/services/book-borrowing.service';
import { BookBorrowingItemsService } from '@/modules/book-borrowing/services/book-borrowing-items.service';
import { BookBorrowing } from '@/modules/book-borrowing/entities/book-borrowing.entity';
import { BookBorrowingItems } from '@/modules/book-borrowing/entities/book-borrowing-items.entity';

@Injectable()
export class FineTicketService {
  constructor(
    private readonly fineTicketRepository: FineTicketRepository,
    private readonly bookBorrowingService: BookBorrowingService,
    private readonly bookBorrowingItemsService: BookBorrowingItemsService,
  ) {}

  private readonly logger = new Logger(FineTicketService.name);

  findOne(id: number): Promise<FineTicket> {
    return this.fineTicketRepository.findOneById(id);
  }

  // used for cron job
  findOneByBookBorrowingId(book_borrowing_id: number): Promise<FineTicket> {
    return this.fineTicketRepository.findOneBy({ book_borrowing_id });
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<FineTicket[]>> {
    return this.fineTicketRepository.findAll(paginationDto);
  }

  createOne(createFineTicketDto: CreateFineTicketDto): Promise<FineTicket> {
    return this.fineTicketRepository.createOne(createFineTicketDto);
  }

  updateOne(id: number, updateFineTicketDto: UpdateFineTicketDto): Promise<FineTicket> {
    return this.fineTicketRepository.updateOneById(id, updateFineTicketDto);
  }

  deleteOne(id: number): Promise<FineTicket> {
    return this.fineTicketRepository.deleteOneById(id);
  }

  // tạo thẻ phạt với những hoạt động trả sách trễ hạn
  @Cron(CronExpression.EVERY_10_SECONDS, { name: JOB_NAME.FINE_TICKET })
  async cronFineBooksLateReturn(): Promise<void> {
    this.logger.fatal('[JOB] Auto create fine ticket if book borrowing was not returned.');

    const overdueBorrowedBooks: BookBorrowing[] = await this.bookBorrowingService.findAllOverdueBorrowedBooks();
    const overdueBorrowedBooksIds: number[] = overdueBorrowedBooks.map(({ id }) => id);

    const overdueBorrowedBooksNotReturn: BookBorrowingItems[] =
      await this.bookBorrowingItemsService.findAllOverdueBorrowedBooksNotReturn(overdueBorrowedBooksIds);

    for (const overdueReturn of overdueBorrowedBooksNotReturn) {
      const existedFine: FineTicket = await this.findOneByBookBorrowingId(overdueReturn.book_borrowing_id);

      if (isEmpty(existedFine)) {
        this.fineTicketRepository.createOne({
          amount_money: overdueReturn.total_price,
          book_borrowing_id: overdueReturn.book_borrowing_id,
          return_status: FINE_TICKET_STATUS.UNPAID,
        });
      } else {
        this.updateOne(existedFine.id, { return_status: FINE_TICKET_STATUS.PAID });
      }
    }
  }
}
