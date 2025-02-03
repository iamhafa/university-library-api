import { DeleteResult } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { CreateBookBorrowingDto } from './dto/create-book-borrowing.dto';
import { UpdateBookBorrowingDto } from './dto/update-book-borrowing.dto';
import { BookBorrowing } from './entities/book-borrowing.entity';
import { BookBorrowingRepository } from './book-borrowing.repository';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/pagination.dto';

@Injectable()
export class BookBorrowingService {
  constructor(private readonly bookBorrowingRepository: BookBorrowingRepository) {}

  findOne(id: number): Promise<BookBorrowing> {
    return this.bookBorrowingRepository.findOneById({ id });
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<BookBorrowing>> {
    return this.bookBorrowingRepository.findAll(paginationDto);
  }

  createOne(createBookBorrowingDto: CreateBookBorrowingDto): Promise<BookBorrowing> {
    return this.bookBorrowingRepository.createOne(createBookBorrowingDto);
  }

  updateOne(id: number, updateBookBorrowingDto: UpdateBookBorrowingDto): Promise<BookBorrowing> {
    return this.bookBorrowingRepository.findOneByIdAndUpdate({ id }, updateBookBorrowingDto);
  }

  deleteOne(id: number): Promise<DeleteResult> {
    return this.bookBorrowingRepository.findOneAndDelete({ id });
  }
}
