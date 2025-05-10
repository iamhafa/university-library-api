import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Genre } from '../entities/genre.entity';
import { BaseRepository } from '@/libs/database/repositories/base.repository';

@Injectable()
export class GenreRepository extends BaseRepository<Genre> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Genre, entityManager);
  }
}
