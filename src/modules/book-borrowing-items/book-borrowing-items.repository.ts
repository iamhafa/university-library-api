import { FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@/libs/database/base.repository';
import { BookBorrowingItems } from './entities/book-borrowing-items.entity';

@Injectable()
export class BookBorrowingItemsRepository extends BaseRepository<BookBorrowingItems> {
  constructor(
    @InjectRepository(BookBorrowingItems)
    protected readonly bookBorrowingItemsRepository: Repository<BookBorrowingItems>,
  ) {
    super(bookBorrowingItemsRepository);
  }

  findAllBy(where: FindOptionsWhere<BookBorrowingItems>): Promise<BookBorrowingItems[]> {
    return this.bookBorrowingItemsRepository.findBy(where);
  }
}
