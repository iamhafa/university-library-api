import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookAuthorItems } from '../entities/book-author-items.entity';
import { BaseRepository } from '@/libs/database/repositories/base.repository';

@Injectable()
export class BookAuthorItemsRepository extends BaseRepository<BookAuthorItems> {
  constructor(@InjectRepository(BookAuthorItems) readonly bookAuthorItemsRepository: Repository<BookAuthorItems>) {
    super(bookAuthorItemsRepository);
  }

  findByBookId(bookId: number): Promise<BookAuthorItems[]> {
    return this.bookAuthorItemsRepository.findBy({ book_id: bookId });
  }
}
