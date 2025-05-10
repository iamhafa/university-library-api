import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/libs/database/repositories/base.repository';
import { Fine } from './entities/fine.entity';

@Injectable()
export class FineRepository extends BaseRepository<Fine> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Fine, entityManager);
  }
}
