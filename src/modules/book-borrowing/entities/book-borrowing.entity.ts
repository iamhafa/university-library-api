import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/entities/base.entity';
import { Book } from '@/modules/book/entities/book.entity';
import { Member } from '@/modules/member/entities/member.entity';
import { FineTicket } from '@/modules/fine-ticket/entities/fine-ticket.entity';
import { BORROWING_STATUS } from '@/common/constants/enum';

// Ghi dấu việc mượn sách của sinh viên
@Entity()
export class BookBorrowing extends BaseEntity {
  // FK of Member
  @Column()
  member_id: number;

  @Column({
    type: 'enum',
    enum: BORROWING_STATUS,
    default: BORROWING_STATUS.BORROWING,
  })
  status: BORROWING_STATUS;

  // ngày mượn sách mặc định là thời điểm khởi tạo record
  @CreateDateColumn()
  borrowing_date: Date;

  // ngày phải trả sách
  @Column({
    // mặc định ngày cần trả sách + 2 tháng so với ngày mượn sách
    default: () => `CURRENT_TIMESTAMP + INTERVAL '2 months'`,
  })
  due_date: Date;

  @Column({ default: null })
  returned_date: Date;

  @Column({ default: null })
  created_by: string;

  @Column({ default: null })
  updated_by: string;

  @ManyToOne(() => Member, (member) => member.bookBorrowings)
  @JoinColumn({ name: 'member_id' })
  readonly member?: Relation<Member>;

  // Thể hiện quan hệ many to many với Book
  @OneToMany(() => Book, (book) => book.bookBorrowings)
  readonly books?: Relation<Book[]>;

  // 1 lần mượn sách (có thể gồm nhiều sách) thì có thể có nhiều vé phạt nếu trễ hạn trả
  @OneToMany(() => FineTicket, (fineTicket) => fineTicket.bookBorrowing)
  readonly fineTickets?: Relation<FineTicket[]>;
}
