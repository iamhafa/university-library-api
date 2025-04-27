import { DeleteResult, Equal, LessThan, MoreThan, Or } from 'typeorm';
import { Injectable } from '@nestjs/common';
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
    return this.bookBorrowingRepository.findOneBy({ id });
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<BookBorrowing> | BookBorrowing[]> {
    return this.bookBorrowingRepository.findAll(paginationDto);
  }

  createOne(createBookBorrowingDto: CreateBookBorrowingDto): Promise<BookBorrowing> {
    return this.bookBorrowingRepository.createOne(createBookBorrowingDto);
  }

  updateOne(id: number, updateBookBorrowingDto: UpdateBookBorrowingDto): Promise<BookBorrowing> {
    return this.bookBorrowingRepository.updateOne({ id }, updateBookBorrowingDto);
  }

  deleteOne(id: number): Promise<BookBorrowing> {
    return this.bookBorrowingRepository.deleteOne({ id });
  }

  findAllOverdueBorrowedBooks(): Promise<BookBorrowing[]> {
    const currentDate = new Date();
    return this.bookBorrowingRepository.findAllBy({ due_date: LessThan(currentDate) });
  }

  findAllDueDateBorrowedBooks() {
    const currentDate = new Date();
    return this.bookBorrowingRepository.findAllBy({ due_date: Or(Equal(currentDate), MoreThan(currentDate)) });
  }
}
