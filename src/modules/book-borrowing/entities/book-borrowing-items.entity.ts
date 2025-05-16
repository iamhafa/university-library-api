import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/entities/base.entity';
import { Book } from '@/modules/book/entities/book.entity';
import { BookBorrowing } from '@/modules/book-borrowing/entities/book-borrowing.entity';

// Ghi dấu từng cuốn sách cho mỗi lần mượn sách của sinh viên
// Bảng trung gian của Book và BookBorrowing (many to many)
@Entity()
export class BookBorrowingItems extends BaseEntity {
  // số lượng mượn của 1 cuốn sách (ex: mượn 10 cuốn 'Nhập môn lập trình')
  @Column({ default: 1 })
  quantity: number;

  @Column()
  price: number; // số tiền của mỗi cuốn sách

  @Column({ nullable: true })
  returned_date: Date;

  // PK for Book (many to many with Borrow Borrowing)
  @Column()
  book_id: number;

  // PK for BookBorrowing (many to many with Book)
  @Column()
  book_borrowing_id: number;

  @ManyToOne(() => Book, (book) => book.bookBorrowings)
  @JoinColumn({ name: 'book_id' }) // mapping với @Column() book_id
  readonly book?: Relation<Book>;

  @ManyToOne(() => BookBorrowing, (bookBorrowing) => bookBorrowing.books)
  @JoinColumn({ name: 'book_borrowing_id' }) // mapping với @Column() book_borrowing_id
  readonly bookBorrowing?: Relation<BookBorrowing>;
}
