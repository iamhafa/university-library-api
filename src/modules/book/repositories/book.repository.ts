import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/libs/database/repositories/base.repository';
import { Book } from '../entities/book.entity';

@Injectable()
export class BookRepository extends BaseRepository<Book> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Book, entityManager);
  }
}
