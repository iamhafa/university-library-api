import { Injectable } from '@nestjs/common';
import { CreateBookBorrowingItemsDto } from '../dto/create-book-borrowing-items.dto';
import { UpdateBookBorrowingItemsDto } from '../dto/update-book-borrowing-items.dto';
import { BookBorrowingItems } from '../entities/book-borrowing-items.entity';
import { BookBorrowingItemsRepository } from '../repositories/book-borrowing-items.repository';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';
import { BulkCreateBookBorrowingItemsDto } from '../dto/bulk-create-book-borrowing-items.dto';
import { BulkUpdateBookBorrowingItemsDto } from '../dto/bulk-update-book-borrowing-items.dto';

@Injectable()
export class BookBorrowingItemsService {
  constructor(private readonly bookBorrowingItemsRepository: BookBorrowingItemsRepository) {}

  findOne(id: number): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsRepository.findOneById(id);
  }

  findAll(paginationDto?: PaginationDto): Promise<TPagination<BookBorrowingItems[]>> {
    return this.bookBorrowingItemsRepository.findAll({ paginationDto });
  }

  // createOne(borrowingId: number, createBookBorrowingItemsDto: CreateBookBorrowingItemsDto): Promise<BookBorrowingItems> {
  //   return this.bookBorrowingItemsRepository.createOne({
  //     borrowing_id: borrowingId,
  //     ...createBookBorrowingItemsDto,
  //   });
  // }

  createMany(borrowingId: number, { items }: BulkCreateBookBorrowingItemsDto): Promise<BookBorrowingItems[]> {
    return this.bookBorrowingItemsRepository.bulkCreate(borrowingId, items);
  }

  updateOne(id: number, updateBookBorrowingItemsDto: UpdateBookBorrowingItemsDto): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsRepository.updateOneById(id, updateBookBorrowingItemsDto);
  }

  updateMany(borrowingId: number, { items }: BulkUpdateBookBorrowingItemsDto): Promise<BookBorrowingItems[]> {
    return this.bookBorrowingItemsRepository.bulkUpdate(borrowingId, items);
  }

  deleteOne(id: number): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsRepository.deleteOneById(id);
  }

  getByBorrowingId(borrowingId: number): Promise<BookBorrowingItems[]> {
    return this.bookBorrowingItemsRepository.findBy({ borrowing_id: borrowingId });
  }
}
