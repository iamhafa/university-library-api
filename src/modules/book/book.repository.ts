import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@/libs/database/base.repository';
import { Book } from './entities/book.entity';

@Injectable()
export class BookRepository extends BaseRepository<Book> {
  constructor(@InjectRepository(Book) private readonly bookRepository: Repository<Book>) {
    super(bookRepository);
  }
}
