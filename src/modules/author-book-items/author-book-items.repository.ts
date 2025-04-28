import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/libs/database/base.repository';
import { AuthorBookItems } from './entities/author-book-items.entity';

@Injectable()
export class AuthorBookItemsRepository extends BaseRepository<AuthorBookItems> {
  constructor(
    @InjectRepository(AuthorBookItems)
    protected readonly authorBookItemsRepository: Repository<AuthorBookItems>,
  ) {
    super(authorBookItemsRepository);
  }
}
