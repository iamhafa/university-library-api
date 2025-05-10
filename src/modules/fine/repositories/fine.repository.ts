import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Fine } from '../entities/fine.entity';
import { BaseRepository } from '@/libs/database/repositories/base.repository';

@Injectable()
export class FineRepository extends BaseRepository<Fine> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Fine, entityManager);
  }
}
