import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/libs/database/repositories/base.repository';
import { Publisher } from './entities/publisher.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class PublisherRepository extends BaseRepository<Publisher> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Publisher, entityManager);
  }
}
