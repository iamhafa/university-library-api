import { Injectable } from '@nestjs/common';
import { BookBorrowingItemsRepository } from '@/modules/book-borrowing/repositories/book-borrowing-items.repository';

@Injectable()
export class ReportService {
  constructor(private readonly bookBorrowingItemsRepository: BookBorrowingItemsRepository) {}

  async borrowingMonthlyStatistics(startDate: string, endDate: string) {
    const statistics = await this.bookBorrowingItemsRepository
      .createQueryBuilder('items')
      .innerJoin('items.bookBorrowing', 'borrowing')
      .innerJoin('items.book', 'book')
      .where('borrowing.borrowing_date BETWEEN :start AND :end', { start: startDate, end: endDate })
      .select('items.book_id', 'book_id')
      .addSelect('book.title', 'title')
      .addSelect('SUM(items.quantity)', 'total_borrowed')
      .groupBy('items.book_id')
      .addGroupBy('book.title')
      .orderBy('total_borrowed', 'DESC')
      .getRawMany();

    return statistics;
  }
}
