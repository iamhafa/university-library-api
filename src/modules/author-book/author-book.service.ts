import { Injectable } from '@nestjs/common';
import { CreateAuthorBookDto } from './dto/create-author-book.dto';
import { UpdateAuthorBookDto } from './dto/update-author-book.dto';
import { AuthorBookRepository } from './author-book.repository';
import { AuthorBook } from './entities/author-book.entity';

@Injectable()
export class AuthorBookService {
  constructor(private readonly authorBookRepository: AuthorBookRepository) {}

  getAll(): Promise<AuthorBook[]> {
    return this.authorBookRepository.findAllWithRelations({ book: true, author: true });
  }

  getOne(id: number): Promise<AuthorBook> {
    return this.authorBookRepository.findOne({ id });
  }
}
