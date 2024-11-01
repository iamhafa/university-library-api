import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/base.entity';
import { Book } from '@/modules/book/entities/book.entity';
import { BookBorrowing } from '@/modules/book-borrowing/entities/book-borrowing.entity';
import { EBorrowingStatus } from '@/common/constants';

// Ghi dấu từng cuốn sách cho mỗi lần mượn sách của sinh viên
// Bảng trung gian của Book và BookBorrowing (many to many)
@Entity({ name: 'book_borrowing_items' })
export class BookBorrowingItems extends BaseEntity {
  // số lượng mượn của 1 cuốn sách (ex: mượn 10 cuốn 'Nhập môn lập trình')
  @Column({ default: 1 })
  quantity: number;

  @Column()
  totalPrice: number; // tổng giá trị của 1 cuốn sách = số lượng * giá 1 cuốn

  @Column()
  returnedDate: Date;

  @Column({
    type: 'enum',
    enum: EBorrowingStatus,
    default: EBorrowingStatus.BORROWING,
  })
  status: EBorrowingStatus;

  // PK for Book (many to many with Borrow Borrowing)
  @PrimaryColumn()
  bookId: number;

  @ManyToOne(() => Book, (book) => book.bookBorrowings)
  book: Relation<Book>;

  // PK for BookBorrowing (many to many with Book)
  @PrimaryColumn()
  bookBorrowingId: number;

  @ManyToOne(() => BookBorrowing, (bookBorrowing) => bookBorrowing.books)
  bookBorrowing: Relation<BookBorrowing>;
}