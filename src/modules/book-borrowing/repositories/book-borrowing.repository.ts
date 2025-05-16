import { EntityManager, In, UpdateResult } from 'typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { BaseRepository } from '@/libs/database/repositories/base.repository';
import { BookBorrowing } from '../entities/book-borrowing.entity';
import { UpdateBookBorrowingDto } from '../dto/update-book-borrowing.dto';

@Injectable()
export class BookBorrowingRepository extends BaseRepository<BookBorrowing> {
  constructor(protected readonly entityManager: EntityManager) {
    super(BookBorrowing, entityManager);
  }

  async updateManyByIds(ids: number[], updateBookBorrowingDto: UpdateBookBorrowingDto): Promise<BookBorrowing[]> {
    const updated: UpdateResult = await this.update(ids, updateBookBorrowingDto);

    // Nếu đã cập nhật thành công cho nhiều hơn 1 record
    if (updated.affected >= 1) {
      // Trả về danh sách records đã được cập nhật thành công
      return this.findBy({ id: In(ids) });
    } else {
      throw new ConflictException(`Update failed for many records with list ID: ${JSON.stringify(ids)}`);
    }
  }
}
