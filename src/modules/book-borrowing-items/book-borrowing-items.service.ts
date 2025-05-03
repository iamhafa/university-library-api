import { isArray, isNull } from 'lodash';
import { In, IsNull } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateBookBorrowingItemsDto } from './dto/create-book-borrowing-items.dto';
import { UpdateBookBookBorrowingDto } from './dto/update-book-borrowing-items.dto';
import { BookBorrowingItems } from './entities/book-borrowing-items.entity';
import { BookBorrowingItemsRepository } from './book-borrowing-items.repository';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/pagination.dto';
import { BORROWING_STATUS, JOB_NAME } from '@/common/constants/enum';
import { BookBorrowingService } from '../book-borrowing/book-borrowing.service';
import { BookBorrowing } from '../book-borrowing/entities/book-borrowing.entity';

@Injectable()
export class BookBorrowingItemsService {
  constructor(
    private readonly bookBorrowingItemsRepository: BookBorrowingItemsRepository,
    private readonly bookBorrowingService: BookBorrowingService,
  ) {}

  private readonly logger = new Logger(BookBorrowingItemsService.name);

  findOne(id: number): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsRepository.findOneBy({ id });
  }

  findAll(paginationDto?: PaginationDto): Promise<TPagination<BookBorrowingItems[]>> {
    return this.bookBorrowingItemsRepository.findAll(paginationDto);
  }

  createOne(createBookBorrowingItemsDto: CreateBookBorrowingItemsDto): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsRepository.createOne(createBookBorrowingItemsDto);
  }

  updateOne(id: number, updateBookBorrowingItemsDto: UpdateBookBookBorrowingDto): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsRepository.updateOneBy({ id }, updateBookBorrowingItemsDto);
  }

  deleteOne(id: number): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsRepository.deleteOneBy({ id });
  }

  // used for cron job
  findAllOverdueBorrowedBooksNotReturn(bookBorrowingIds: number[]): Promise<BookBorrowingItems[]> {
    return this.bookBorrowingItemsRepository.findAllBy({
      book_borrowing_id: In(bookBorrowingIds),
      returned_date: IsNull(),
      status: BORROWING_STATUS.OVERDUE,
    });
  }

  @Cron(CronExpression.EVERY_10_SECONDS, { name: JOB_NAME.BOOK_BORROWING_ITEMS })
  async cronSyncUpStatus(): Promise<void> {
    this.logger.fatal('[JOB] Sync up status');

    // list all items borrowing
    const listBookBorrowingItems = await this.findAll();

    if (isArray(listBookBorrowingItems)) {
      for (const item of listBookBorrowingItems) {
        const currentDate = new Date();

        if (isNull(item.returned_date)) {
          const bookBorrowing: BookBorrowing = await this.bookBorrowingService.findOne(item.book_borrowing_id);

          if (bookBorrowing.due_date < currentDate) {
            this.updateOne(item.id, { status: BORROWING_STATUS.OVERDUE });
          } else {
            this.updateOne(item.id, { status: BORROWING_STATUS.BORROWING });
          }
        } else if (item.returned_date < currentDate) {
          this.updateOne(item.id, { status: BORROWING_STATUS.RETURNED });
        } else {
          this.logger.error(`Conflict in ${JOB_NAME.BOOK_BORROWING_ITEMS}`);
        }
      }
    }
  }
}
