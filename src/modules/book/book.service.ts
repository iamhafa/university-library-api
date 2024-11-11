import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookRepository } from './book.repository';
import { AuthorService } from '../author/author.service';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly authorService: AuthorService,
  ) {}

  findAll() {
    return this.bookRepository.findAll();
  }

  findOne(id: number) {
    return this.bookRepository.findOne({ id });
  }

  async createOne(createBookDto: CreateBookDto) {
    const { authorId } = createBookDto;
    const findAuthorExisted = await this.authorService.findOne(authorId);

    // if (findAuthorExisted) {
    //   return this.bookRepository.createOne(createBookDto);
    // }
  }
}
