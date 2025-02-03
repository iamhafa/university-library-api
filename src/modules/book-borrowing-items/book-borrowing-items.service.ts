import { DeleteResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateBookBorrowingItemsDto } from './dto/create-book-borrowing-items.dto';
import { UpdateBookBookBorrowingDto } from './dto/update-book-borrowing-items.dto';
import { BookBorrowingItems } from './entities/book-borrowing-items.entity';
import { BookBorrowingItemsRepository } from './book-borrowing-items.repository';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/pagination.dto';

@Injectable()
export class BookBorrowingItemsService {
  constructor(private readonly bookBorrowingItemsRepository: BookBorrowingItemsRepository) {}

  findOne(id: number): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsRepository.findOneById({ id });
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<BookBorrowingItems>> {
    return this.bookBorrowingItemsRepository.findAll(paginationDto);
  }

  createOne(createBookBorrowingItemsDto: CreateBookBorrowingItemsDto): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsRepository.createOne(createBookBorrowingItemsDto);
  }

  updateOne(id: number, updateBookBorrowingItemsDto: UpdateBookBookBorrowingDto): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsRepository.findOneByIdAndUpdate({ id }, updateBookBorrowingItemsDto);
  }

  deleteOne(id: number): Promise<DeleteResult> {
    return this.bookBorrowingItemsRepository.findOneAndDelete({ id });
  }
}
