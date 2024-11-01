import { Injectable } from '@nestjs/common';
import { CreateBookBorrowingDto } from './dto/create-order.dto';
import { UpdateBookBorrowingDto } from './dto/update-order.dto';

@Injectable()
export class BookBorrowingService {
  create(createBookBorrowingDto: CreateBookBorrowingDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateBookBorrowingDto: UpdateBookBorrowingDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
