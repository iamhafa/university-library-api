import { EntityManager, In, UpdateResult } from 'typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { BaseRepository } from '@/libs/database/repositories/base.repository';
import { Borrowing } from '../entities/borrowing.entity';
import { UpdateBorrowingDto } from '../dto/update-borrowing.dto';

@Injectable()
export class BorrowingRepository extends BaseRepository<Borrowing> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Borrowing, entityManager);
  }

  async updateManyByIds(ids: number[], updateBorrowingDto: UpdateBorrowingDto): Promise<Borrowing[]> {
    const updated: UpdateResult = await this.update(ids, updateBorrowingDto);

    // Nếu đã cập nhật thành công cho nhiều hơn 1 record
    if (updated.affected >= 1) {
      // Trả về danh sách records đã được cập nhật thành công
      return this.findBy({ id: In(ids) });
    } else {
      throw new ConflictException(`Update failed for many records with list ID: ${JSON.stringify(ids)}`);
    }
  }
}
