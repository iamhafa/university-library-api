import { EntityManager, UpdateResult } from 'typeorm';
import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookRepository } from '../repositories/book.repository';
import { Book } from '../entities/book.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';
import { TransactionManager } from '@/libs/database/managers/transaction.manager';
import { BookAuthorItems } from '../entities/book-author-items.entity';
import { Author } from '@/modules/author/entities/author.entity';
import { BookAuthorItemsRepository } from '../repositories/book-author-items.repository';

@Injectable()
export class BookService {
  private readonly logger = new Logger(BookService.name);
  constructor(
    private readonly transactionManager: TransactionManager,
    private readonly bookRepository: BookRepository,
    private readonly bookAuthorItemsRepository: BookAuthorItemsRepository,
  ) {}

  async findOne(id: number): Promise<Book> {
    const book: Book = await this.bookRepository.findOneById(id, {
      relations: {
        genre: true,
        publisher: true,
      },
    });

    const bookAuthors: BookAuthorItems[] = await this.bookAuthorItemsRepository.getAuthorsByBookId(id);
    // Append the authors related to that book
    Object.assign(book, { book_author_items: bookAuthors });

    return book;
  }

  async findAll(paginationDto: PaginationDto): Promise<TPagination<Book[]>> {
    const booksPaginated: TPagination<Book[]> = await this.bookRepository.findAll({
      paginationDto,
      relations: {
        genre: true,
        publisher: true,
      },
    });

    const { data: books } = booksPaginated;
    // Lặp từng cuốn sách
    for (const book of books) {
      const bookAuthors: BookAuthorItems[] = await this.bookAuthorItemsRepository.getAuthorsByBookId(book.id);
      // Append the authors related to single book
      Object.assign(book, { book_author_items: bookAuthors });
    }

    return booksPaginated;
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
    const { author_ids, ...updateDto } = updateAuthorDto;

    return this.transactionManager.execute(Book, async (entityManager: EntityManager): Promise<Book> => {
      const updateResult: UpdateResult = await entityManager.update(Book, id, updateDto);

      if (!updateResult.affected || updateResult.affected === 0) {
        throw new ConflictException(`Book with ID ${id} not found or no changes were made`);
      }
      this.logger.log(`Successfully updated book ID: ${id}, affected rows: ${updateResult.affected}`);

      const existingBookAuthors: BookAuthorItems[] = await entityManager.findBy(BookAuthorItems, { book_id: id });

      // 1st, remove existing items
      const removedBookAuthors: BookAuthorItems[] = await entityManager.remove(existingBookAuthors);
      this.logger.debug(`Removed ${removedBookAuthors.length} existing book-author relationships for book ID: ${id}`);

      // 2nd, create new records
      const newBookAuthorItems: BookAuthorItems[] = author_ids.map((authorId: number) => {
        return entityManager.create(BookAuthorItems, {
          book_id: id,
          author_id: authorId,
        });
      });
      const createdBookAuthors: BookAuthorItems[] = await entityManager.save(newBookAuthorItems);
      this.logger.log(
        `Created ${createdBookAuthors.length} new book-author relationships for book ID: ${id} with authors: [${author_ids.join(', ')}]`,
      );

      return this.findOne(id);
    });
  }

  deleteOne(id: number): Promise<Book> {
    return this.bookRepository.deleteOneById(id);
  }
}
