import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@/libs/database/repositories/base.repository';
import { BookBorrowingItems } from './entities/book-borrowing-items.entity';

@Injectable()
export class BookBorrowingItemsRepository extends BaseRepository<BookBorrowingItems> {
  constructor(protected readonly entityManager: EntityManager) {
    super(BookBorrowingItems, entityManager);
  }
}
