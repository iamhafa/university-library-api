import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BookAuthorItems } from '../entities/book-author-items.entity';
import { BaseRepository } from '@/libs/database/repositories/base.repository';

@Injectable()
export class BookAuthorItemsRepository extends BaseRepository<BookAuthorItems> {
  constructor(protected readonly entityManager: EntityManager) {
    super(BookAuthorItems, entityManager);
  }

  getAuthorsByBookId(bookId: number): Promise<BookAuthorItems[]> {
    return this.findBy({ book_id: bookId });
  }
}
