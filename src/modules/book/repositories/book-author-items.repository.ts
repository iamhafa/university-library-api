import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookAuthorItems } from '../entities/book-author-items.entity';
import { BaseRepository } from '@/libs/database/repositories/base.repository';

@Injectable()
export class BookAuthorItemsRepository extends BaseRepository<BookAuthorItems> {
  constructor(protected readonly entityManager: EntityManager) {
    super(BookAuthorItems, entityManager);
  }
}
