import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/libs/database/base.repository';
import { AuthorBook } from './entities/author-book.entity';

@Injectable()
export class AuthorBookRepository extends BaseRepository<AuthorBook> {
  protected readonly logger = new Logger(AuthorBookRepository.name);

  constructor(@InjectRepository(AuthorBook) private readonly authorBookRepository: Repository<AuthorBook>) {
    super(authorBookRepository);
  }
}
