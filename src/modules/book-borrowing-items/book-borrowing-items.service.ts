import { DeleteResult, In, IsNull } from 'typeorm';
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

@Injectable()
export class BookBorrowingItemsService {
  constructor(
    private readonly bookBorrowingItemsRepository: BookBorrowingItemsRepository,
    private readonly bookBorrowingService: BookBorrowingService,
  ) {}

  private readonly logger = new Logger(BookBorrowingItemsService.name);

  @Cron(CronExpression.EVERY_10_SECONDS, { name: JOB_NAME.BOOK_BORROWING_ITEMS })
  async syncUpStatus(): Promise<void> {
    this.logger.fatal('[JOB] Sync up status');

    const dueDateBorrowedBooks = await this.bookBorrowingService.findAllDueDateBorrowedBooks();
    const dueDateBookBorrowingIds = dueDateBorrowedBooks.map(({ id }) => id);

    const data = await this.findAllDueDateBorrowedBooks(dueDateBookBorrowingIds);
    // console.log(data.);
  }

  findOne(id: number): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsRepository.findOneById({ id });
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<BookBorrowingItems> | BookBorrowingItems[]> {
    return this.bookBorrowingItemsRepository.findAll(paginationDto);
  }

  createOne(createBookBorrowingItemsDto: CreateBookBorrowingItemsDto): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsRepository.createOne(createBookBorrowingItemsDto);
  }

  updateOne(id: number, updateBookBorrowingItemsDto: UpdateBookBookBorrowingDto): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsRepository.findOneByIdAndUpdate({ id }, updateBookBorrowingItemsDto);
  }

  deleteOne(id: number): Promise<DeleteResult> {
    return this.bookBorrowingItemsRepository.findOneAndDelete({ id });
  }

  findAllOverdueBorrowedBooksNotReturn(bookBorrowingIds: number[]): Promise<BookBorrowingItems[]> {
    return this.bookBorrowingItemsRepository.findAllWithFilter({
      book_borrowing_id: In(bookBorrowingIds),
      returned_date: IsNull(),
      status: BORROWING_STATUS.OVERDUE,
    });
  }

  findAllDueDateBorrowedBooks(bookBorrowingIds: number[]) {
    return this.bookBorrowingItemsRepository.findAllWithRelations(
      { bookBorrowing: true },
      { book_borrowing_id: In(bookBorrowingIds) },
    );
  }
}
