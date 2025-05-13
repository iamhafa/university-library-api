import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FineTicket } from '../entities/fine-ticket.entity';
import { BaseRepository } from '@/libs/database/repositories/base.repository';

@Injectable()
export class FineTicketRepository extends BaseRepository<FineTicket> {
  constructor(protected readonly entityManager: EntityManager) {
    super(FineTicket, entityManager);
  }
}
