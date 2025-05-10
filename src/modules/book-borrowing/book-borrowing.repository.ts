import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/libs/database/repositories/base.repository';
import { BookBorrowing } from './entities/book-borrowing.entity';

@Injectable()
export class BookBorrowingRepository extends BaseRepository<BookBorrowing> {
  constructor(protected readonly entityManager: EntityManager) {
    super(BookBorrowing, entityManager);
  }
}
