import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/libs/database/repositories/base.repository';
import { BookBorrowingItems } from '../entities/book-borrowing-items.entity';

@Injectable()
export class BookBorrowingItemsRepository extends BaseRepository<BookBorrowingItems> {
  constructor(protected readonly entityManager: EntityManager) {
    super(BookBorrowingItems, entityManager);
  }
}
