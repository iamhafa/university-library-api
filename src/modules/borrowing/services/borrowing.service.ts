import { Injectable } from '@nestjs/common';
import { CreateBorrowingDto } from '../dto/create-borrowing.dto';
import { UpdateBorrowingDto } from '../dto/update-book-borrowing.dto';
import { Borrowing } from '../entities/borrowing.entity';
import { BorrowingRepository } from '../repositories/borrowing.repository';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';

@Injectable()
export class BorrowingService {
  constructor(private readonly borrowingRepository: BorrowingRepository) {}

  findOne(id: number): Promise<Borrowing> {
    return this.borrowingRepository.findOneById(id);
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<Borrowing[]>> {
    return this.borrowingRepository.findAll(paginationDto);
  }

  createOne(createBookBorrowingDto: CreateBorrowingDto): Promise<Borrowing> {
    return this.borrowingRepository.createOne(createBookBorrowingDto);
  }

  updateOne(id: number, updateBookBorrowingDto: UpdateBorrowingDto): Promise<Borrowing> {
    return this.borrowingRepository.updateOneById(id, updateBookBorrowingDto);
  }

  deleteOne(id: number): Promise<Borrowing> {
    return this.borrowingRepository.deleteOneById(id);
  }
}
