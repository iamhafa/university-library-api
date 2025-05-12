import { Injectable } from '@nestjs/common';
import { BookAuthorItems } from '../entities/book-author-items.entity';
import { BookAuthorItemsRepository } from '../repositories/book-author-items.repository';

@Injectable()
export class BookAuthorItemsService {
  constructor(private readonly bookAuthorItemsRepository: BookAuthorItemsRepository) {}

  getByBookId(bookId: number): Promise<BookAuthorItems[]> {
    return this.bookAuthorItemsRepository.findBy({ book_id: bookId });
  }
}
