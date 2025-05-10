import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/libs/database/repositories/base.repository';
import { Publisher } from '../entities/publisher.entity';

@Injectable()
export class PublisherRepository extends BaseRepository<Publisher> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Publisher, entityManager);
  }
}
