import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/entities/base.entity';
import { BookBorrowing } from '@/modules/book-borrowing/entities/book-borrowing.entity';
import { FINE_TICKET_STATUS } from '@/common/constants/enum';

// Quản lý các khoản phạt nếu sách không được trả đúng hạn.
@Entity()
export class FineTicket extends BaseEntity {
  // FK of Book Borrowing
  @Column()
  book_borrowing_id: number;

  @Column({
    type: 'enum',
    enum: FINE_TICKET_STATUS,
    default: FINE_TICKET_STATUS.UNPAID,
  })
  status: FINE_TICKET_STATUS;

  @Column()
  total_fine_amount: number;

  @ManyToOne(() => BookBorrowing, (bookBorrowing) => bookBorrowing.fineTickets)
  @JoinColumn({ name: 'book_borrowing_id' }) // naming for join table
  readonly bookBorrowing?: Relation<BookBorrowing>;
}
