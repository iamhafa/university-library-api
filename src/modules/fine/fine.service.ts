import { isEmpty } from 'lodash';
import { DeleteResult } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BORROWING_STATUS, JOB_NAME } from '@/common/constants/enum';
import { FineRepository } from './fine.repository';
import { CreateFineDto } from './dto/create-fine.dto';
import { UpdateFineDto } from './dto/update-fine.dto';
import { Fine } from './entities/fine.entity';
import { BookBorrowingService } from '../book-borrowing/book-borrowing.service';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/pagination.dto';
import { BookBorrowing } from '../book-borrowing/entities/book-borrowing.entity';
import { BookBorrowingItemsService } from '../book-borrowing-items/book-borrowing-items.service';
import { BookBorrowingItems } from '../book-borrowing-items/entities/book-borrowing-items.entity';

@Injectable()
export class FineService {
  constructor(
    private readonly fineRepository: FineRepository,
    private readonly bookBorrowingService: BookBorrowingService,
    private readonly bookBorrowingItemsService: BookBorrowingItemsService,
  ) {}

  private readonly logger = new Logger(FineService.name);

  findOne(id: number): Promise<Fine> {
    return this.fineRepository.findOneBy({ id });
  }

  // used for cron job
  findOneByBookBorrowingId(book_borrowing_id: number): Promise<Fine> {
    return this.fineRepository.findOneBy({ book_borrowing_id });
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<Fine> | Fine[]> {
    return this.fineRepository.findAll(paginationDto);
  }

  createOne(createFineDto: CreateFineDto): Promise<Fine> {
    return this.fineRepository.createOne(createFineDto);
  }

  updateOne(id: number, updateFineDto: UpdateFineDto): Promise<Fine> {
    return this.fineRepository.updateOne({ id }, updateFineDto);
  }

  deleteOne(id: number): Promise<Fine> {
    return this.fineRepository.deleteOne({ id });
  }

  // tạo thẻ phạt với những hoạt động trả sách trễ hạn
  @Cron(CronExpression.EVERY_10_SECONDS, { name: JOB_NAME.FINE })
  async cronFineBooksLateReturn(): Promise<void> {
    this.logger.fatal('[JOB] Auto create fine ticket');

    const overdueBorrowedBooks: BookBorrowing[] = await this.bookBorrowingService.findAllOverdueBorrowedBooks();
    const overdueBorrowedBooksIds: number[] = overdueBorrowedBooks.map(({ id }) => id);

    const overdueBorrowedBooksNotReturn: BookBorrowingItems[] =
      await this.bookBorrowingItemsService.findAllOverdueBorrowedBooksNotReturn(overdueBorrowedBooksIds);

    for (const overdueReturn of overdueBorrowedBooksNotReturn) {
      const existedFine: Fine = await this.findOneByBookBorrowingId(overdueReturn.book_borrowing_id);

      if (isEmpty(existedFine)) {
        this.createOne({
          amount_money: overdueReturn.total_price,
          book_borrowing_id: overdueReturn.book_borrowing_id,
          return_status: BORROWING_STATUS.OVERDUE,
        });
      } else {
        this.updateOne(existedFine.id, { return_status: BORROWING_STATUS.RETURNED });
      }
    }
  }
}
