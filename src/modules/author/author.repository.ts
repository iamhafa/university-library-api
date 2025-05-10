import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { BaseRepository } from '@/libs/database/repositories/base.repository';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorRepository extends BaseRepository<Author> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Author, entityManager);
  }
}
