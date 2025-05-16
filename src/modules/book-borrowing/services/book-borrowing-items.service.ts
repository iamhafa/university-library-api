import { Injectable, Logger } from '@nestjs/common';
import { CreateBookBorrowingItemsDto } from '../dto/create-book-borrowing-items.dto';
import { UpdateBookBorrowingItemsDto } from '../dto/update-book-borrowing-items.dto';
import { BookBorrowingItems } from '../entities/book-borrowing-items.entity';
import { BookBorrowingItemsRepository } from '../repositories/book-borrowing-items.repository';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';
import { BookBorrowingService } from './book-borrowing.service';

@Injectable()
export class BookBorrowingItemsService {
  constructor(
    private readonly bookBorrowingItemsRepository: BookBorrowingItemsRepository,
    private readonly bookBorrowingService: BookBorrowingService,
  ) {}

  private readonly logger = new Logger(BookBorrowingItemsService.name);

  findOne(id: number): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsRepository.findOneById(id);
  }

  findAll(paginationDto?: PaginationDto): Promise<TPagination<BookBorrowingItems[]>> {
    return this.bookBorrowingItemsRepository.findAll(paginationDto);
  }

  createOne(createBookBorrowingItemsDto: CreateBookBorrowingItemsDto): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsRepository.createOne(createBookBorrowingItemsDto);
  }

  updateOne(id: number, updateBookBorrowingItemsDto: UpdateBookBorrowingItemsDto): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsRepository.updateOneById(id, updateBookBorrowingItemsDto);
  }

  deleteOne(id: number): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsRepository.deleteOneById(id);
  }
}
