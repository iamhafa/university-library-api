import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/libs/database/base.repository';
import { Publisher } from './entities/publisher.entity';

@Injectable()
export class PublisherRepository extends BaseRepository<Publisher> {
  constructor(@InjectRepository(Publisher) private readonly publisherRepository: Repository<Publisher>) {
    super(publisherRepository);
  }
}
