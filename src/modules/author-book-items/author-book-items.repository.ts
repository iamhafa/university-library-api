import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/libs/database/base.repository';
import { AuthorBookItems } from './entities/author-book-items.entity';

@Injectable()
export class AuthorBookItemsRepository extends BaseRepository<AuthorBookItems> {
  protected readonly logger = new Logger(AuthorBookItemsRepository.name);

  constructor(
    @InjectRepository(AuthorBookItems)
    private readonly authorBookItemsRepository: Repository<AuthorBookItems>,
  ) {
    super(authorBookItemsRepository);
  }
}
