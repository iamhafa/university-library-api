import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/entities/base.entity';
import { Book } from '@/modules/book/entities/book.entity';
import { Borrowing } from '@/modules/borrowing/entities/borrowing.entity';

// Ghi dấu từng cuốn sách cho mỗi lần mượn sách của sinh viên
// Bảng trung gian của Book và Borrowing (many to many)
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

  // PK for Borrowing (many to many with Book)
  @Column()
  borrowing_id: number;

  @ManyToOne(() => Book, (book) => book.borrowings)
  @JoinColumn({ name: 'book_id' }) // mapping với @Column() book_id
  readonly book?: Relation<Book>;

  @ManyToOne(() => Borrowing, (borrowing) => borrowing.books)
  @JoinColumn({ name: 'borrowing_id' }) // mapping với @Column() borrowing_id
  readonly borrowing?: Relation<Borrowing>;
}
