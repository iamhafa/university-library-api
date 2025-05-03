import { DeleteResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookRepository } from './book.repository';
import { AuthorService } from '../author/author.service';
import { Book } from './entities/book.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly authorService: AuthorService,
  ) {}

  findOne(id: number): Promise<Book> {
    return this.bookRepository.findOneBy({ id });
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<Book[]>> {
    return this.bookRepository.findAll(paginationDto);
  }

  createOne(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookRepository.createOne(createBookDto);
  }

  updateOne(id: number, updateAuthorDto: UpdateBookDto): Promise<Book> {
    return this.bookRepository.updateOneBy({ id }, updateAuthorDto);
  }

  deleteOne(id: number): Promise<Book> {
    return this.bookRepository.deleteOneBy({ id });
  }
}
