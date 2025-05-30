import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/entities/base.entity';
import { Borrowing } from '@/modules/borrowing/entities/borrowing.entity';
import { FINE_TICKET_PAYMENT_METHOD, FINE_TICKET_STATUS } from '@/common/constants/enum';

// Quản lý các khoản phạt nếu sách không được trả đúng hạn.
@Entity()
export class FineTicket extends BaseEntity {
  // FK of Book Borrowing
  @Column()
  borrowing_id: number;

  @Column({
    type: 'enum',
    enum: FINE_TICKET_STATUS,
    default: FINE_TICKET_STATUS.UNPAID,
  })
  status: FINE_TICKET_STATUS;

  @Column()
  total_fine_amount: number;

  @Column({
    type: 'enum',
    enum: FINE_TICKET_PAYMENT_METHOD,
    default: null,
  })
  payment_method: FINE_TICKET_PAYMENT_METHOD;

  @Column({ type: 'date', default: null })
  payment_date: Date;

  @Column({ default: null })
  created_by: string;

  @Column({ default: null })
  updated_by: string;

  @ManyToOne(() => Borrowing, (borrowing) => borrowing.fineTickets)
  @JoinColumn({ name: 'borrowing_id' }) // naming for join table
  readonly borrowing?: Relation<Borrowing>;
}
