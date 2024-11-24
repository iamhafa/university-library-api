import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/base.entity';
import { BookBorrowing } from '@/modules/book-borrowing/entities/book-borrowing.entity';
import { BORROWING_STATUS } from '@/common/constants';

// Quản lý các khoản phạt nếu sách không được trả đúng hạn.
@Entity()
export class Fine extends BaseEntity {
  @Column()
  amount_money: number;

  @Column({
    type: 'enum',
    enum: BORROWING_STATUS,
    default: BORROWING_STATUS.OVERDUE,
  })
  return_status: BORROWING_STATUS;

  // FK of Book Borrowing
  @Column()
  book_borrowing_id: number;

  // 1 lần mượn sách (có thể gồm nhiều sách) thì có thể có nhiều vé phạt nếu trễ hạn trả
  @ManyToOne(() => BookBorrowing, (bookBorrowing) => bookBorrowing.fines)
  bookBorrowing: Relation<BookBorrowing>;
}
