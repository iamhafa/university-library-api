import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@/libs/database/base.repository';
import { BookBorrowing } from './entities/book-borrowing.entity';

@Injectable()
export class BookBorrowingRepository extends BaseRepository<BookBorrowing> {
  constructor(
    @InjectRepository(BookBorrowing) private readonly bookBorrowingRepository: Repository<BookBorrowing>,
  ) {
    super(bookBorrowingRepository);
  }
}
