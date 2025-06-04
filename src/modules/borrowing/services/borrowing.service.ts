import { Injectable } from '@nestjs/common';
import { CreateBorrowingDto } from '../dto/create-borrowing.dto';
import { UpdateBorrowingDto } from '../dto/update-borrowing.dto';
import { Borrowing } from '../entities/borrowing.entity';
import { BorrowingRepository } from '../repositories/borrowing.repository';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';
import { BORROWING_STATUS } from '@/common/constants/enum';

@Injectable()
export class BorrowingService {
  constructor(private readonly borrowingRepository: BorrowingRepository) {}

  findOne(id: number): Promise<Borrowing> {
    return this.borrowingRepository.findOneById(id);
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<Borrowing[]>> {
    return this.borrowingRepository.findAll(paginationDto, {
      member: true,
    });
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

  returnBook(id: number): Promise<Borrowing> {
    const currentDate = new Date();

    return this.borrowingRepository.updateOneById(id, {
      status: BORROWING_STATUS.RETURNED,
      returned_date: currentDate,
    });
  }
}
