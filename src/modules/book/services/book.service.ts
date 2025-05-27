import { EntityManager } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookRepository } from '../repositories/book.repository';
import { Book } from '../entities/book.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';
import { TransactionManager } from '@/libs/database/managers/transaction.manager';
import { BookAuthorItems } from '../entities/book-author-items.entity';
import { Author } from '@/modules/author/entities/author.entity';

@Injectable()
export class BookService {
  constructor(
    private readonly transactionManager: TransactionManager,
    private readonly bookRepository: BookRepository,
  ) {}

  findOne(id: number): Promise<Book> {
    return this.bookRepository.findOneById(id, { genre: true, publisher: true });
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<Book[]>> {
    return this.bookRepository.findAll(paginationDto, {
      genre: true,
      publisher: true,
    });
  }

  async createOne(createBookDto: CreateBookDto): Promise<Book> {
    // return this.bookRepository.createOne(createBookDto);
    const { author_ids, ...createDto } = createBookDto;

    const book: Book = await this.transactionManager.execute(Book, async (entityManager: EntityManager) => {
      const newBook: Book = entityManager.create(Book, createDto);
      const bookSaved: Book = await entityManager.save(newBook);

      for (const author_id of author_ids) {
        const existAuthor: boolean = await entityManager.existsBy(Author, { id: author_id });

        if (existAuthor) {
          const newBookAuthorItems: BookAuthorItems = entityManager.create(BookAuthorItems, {
            author_id: author_id,
            book_id: bookSaved.id,
          });

          await entityManager.save(newBookAuthorItems);
        } else {
          throw new NotFoundException(`The Author with ID ${author_id} not found.`);
        }
      }
      return bookSaved;
    });

    return this.findOne(book.id);
  }

  updateOne(id: number, updateAuthorDto: UpdateBookDto): Promise<Book> {
    return this.bookRepository.updateOneById(id, updateAuthorDto);
  }

  deleteOne(id: number): Promise<Book> {
    return this.bookRepository.deleteOneById(id);
  }
}
