import { Injectable } from '@nestjs/common';
import { BookBorrowingItemsRepository } from '@/modules/borrowing/repositories/book-borrowing-items.repository';

@Injectable()
export class ReportService {
  constructor(private readonly bookBorrowingItemsRepository: BookBorrowingItemsRepository) {}

  async borrowingMonthlyStatistics(startDate: string, endDate: string) {
    const statistics = await this.bookBorrowingItemsRepository
      .createQueryBuilder('items')
      .innerJoin('items.borrowing', 'borrowing')
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

  async getTop10MostBorrowedBooks(startDate: string, endDate: string) {
    const topBooks = await this.bookBorrowingItemsRepository
      .createQueryBuilder('i')
      .select('book.title', 'book_title')
      .addSelect('borrowing.borrowing_date', 'borrowing_date')
      .addSelect('SUM(i.book_id)', 'total_borrowed')
      .innerJoin('i.borrowing', 'borrowing')
      .innerJoin('i.book', 'book')
      .groupBy('i.book_id')
      .addGroupBy('borrowing.borrowing_date')
      .addGroupBy('book.title')
      .orderBy('total_borrowed', 'ASC')
      .limit(10)
      .getRawMany();

    return topBooks;
  }
}
