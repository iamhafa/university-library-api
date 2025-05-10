import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { BaseRepository } from '@/libs/database/repositories/base.repository';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreRepository extends BaseRepository<Genre> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Genre, entityManager);
  }
}
