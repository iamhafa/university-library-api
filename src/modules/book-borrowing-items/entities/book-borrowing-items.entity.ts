import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/base.entity';
import { Book } from '@/modules/book/entities/book.entity';
import { BookBorrowing } from '@/modules/book-borrowing/entities/book-borrowing.entity';
import { BORROWING_STATUS } from '@/common/constants';

// Ghi dấu từng cuốn sách cho mỗi lần mượn sách của sinh viên
// Bảng trung gian của Book và BookBorrowing (many to many)
@Entity()
export class BookBorrowingItems extends BaseEntity {
  // số lượng mượn của 1 cuốn sách (ex: mượn 10 cuốn 'Nhập môn lập trình')
  @Column({ default: 1 })
  quantity: number;

  @Column()
  total_price: number; // tổng giá trị của 1 cuốn sách = số lượng * giá 1 cuốn

  @Column()
  returned_date: Date;

  @Column({
    type: 'enum',
    enum: BORROWING_STATUS,
    default: BORROWING_STATUS.BORROWING,
  })
  status: BORROWING_STATUS;

  // PK for Book (many to many with Borrow Borrowing)
  @PrimaryColumn()
  book_id: number;

  @ManyToOne(() => Book, (book) => book.bookBorrowings)
  @JoinColumn([{ name: 'book_borrowing_id' }])
  book: Relation<Book>;

  // PK for BookBorrowing (many to many with Book)
  @PrimaryColumn()
  book_borrowing_id: number;

  @ManyToOne(() => BookBorrowing, (bookBorrowing) => bookBorrowing.books)
  @JoinColumn([{ name: 'book_id' }])
  bookBorrowing: Relation<BookBorrowing>;
}
