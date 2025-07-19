import { DeepPartial, EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/libs/database/repositories/base.repository';
import { BookBorrowingItems } from '../entities/book-borrowing-items.entity';

@Injectable()
export class BookBorrowingItemsRepository extends BaseRepository<BookBorrowingItems> {
  constructor(protected readonly entityManager: EntityManager) {
    super(BookBorrowingItems, entityManager);
  }

  /**
   * Tạo nhiều bản ghi BookBorrowingItems cùng lúc.
   * @param borrowingId - ID của lượt mượn sách.
   * @param items - Danh sách dữ liệu các item cần tạo.
   * @returns Danh sách các bản ghi đã được lưu vào DB.
   */
  bulkCreate(borrowingId: number, items: DeepPartial<BookBorrowingItems[]>): Promise<BookBorrowingItems[]> {
    // Gán tất cả các cuốn sách (items) có chung 1 ID lượt mượn sách.
    items.forEach((item: BookBorrowingItems) => (item.borrowing_id = borrowingId));

    const createMultiple: BookBorrowingItems[] = this.create(items);
    return this.save(createMultiple);
  }

  /**
   * Cập nhật nhiều bản ghi BookBorrowingItems cùng lúc.
   * @param borrowingId - `id` lượt mượn.
   * @param items - Danh sách các item với dữ liệu cần cập nhật (phải chứa `id`).
   * @returns Danh sách các bản ghi đã được cập nhật.
   */
  async bulkUpdate(borrowingId: number, items: DeepPartial<BookBorrowingItems>[]): Promise<BookBorrowingItems[]> {
    const preloadedItems: BookBorrowingItems[] = [];

    for (const item of items) {
      if (!item.id) throw new Error('Thiếu ID ở một trong các phần tử cần cập nhật.');

      const existing: boolean = await this.existsBy({ id: item.id });
      if (!existing) throw new Error(`Không tìm thấy bản ghi với ID: ${item.id}`);

      item.borrowing_id = borrowingId;
      const preloaded: BookBorrowingItems = await this.preload(item);

      if (preloaded instanceof BookBorrowingItems) preloadedItems.push(preloaded);
    }

    return this.save(preloadedItems);
  }
}
