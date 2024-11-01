import { Injectable } from '@nestjs/common';
import { CreateBookBookBorrowingDto } from './dto/create-book-order.dto';
import { UpdateBookBookBorrowingDto } from './dto/update-book-order.dto';

@Injectable()
export class BookBorrowingItemsService {
  create(createBookBookBorrowingDto: CreateBookBookBorrowingDto) {
    return 'This action adds a new bookBookBorrowing';
  }

  findAll() {
    return `This action returns all bookBookBorrowing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookBookBorrowing`;
  }

  update(id: number, updateBookBookBorrowingDto: UpdateBookBookBorrowingDto) {
    return `This action updates a #${id} bookBookBorrowing`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookBookBorrowing`;
  }
}
