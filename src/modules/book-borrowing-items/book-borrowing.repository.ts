import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@/libs/database/base.repository';
import { BookBorrowingItems } from './entities/book-borrowing-items.entity';

@Injectable()
export class BookBorrowingItemsRepository extends BaseRepository<BookBorrowingItems> {
  protected readonly logger = new Logger(BookBorrowingItemsRepository.name);

  constructor(
    @InjectRepository(BookBorrowingItems)
    private readonly bookBorrowingItemsRepository: Repository<BookBorrowingItems>,
  ) {
    super(bookBorrowingItemsRepository);
  }
}
