import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/base.entity';
import { Book } from '@/modules/book/entities/book.entity';
import { Member } from '@/modules/member/entities/member.entity';
import { Punish } from '@/modules/punish/entities/punish.entity';

// Ghi dấu việc mượn sách của sinh viên
@Entity()
export class BookBorrowing extends BaseEntity {
  // ngày mượn sách mặc định là thời điểm khởi tạo record
  @CreateDateColumn({ type: 'timestamp' })
  borrowingDate: Date;

  // ngày phải trả sách
  @Column({
    type: 'timestamp',
    // mặc định ngày cần trả sách + 2 tháng so với ngày mượn sách
    default: () => `CURRENT_TIMESTAMP + INTERVAL '2 months'`,
  })
  dueDate: Date;

  @ManyToOne(() => Member, (member) => member.bookBorrowings)
  memberId: number;

  // Thể hiện quan hệ many to many với Book
  @ManyToMany(() => Book, (book) => book.bookBorrowings)
  books?: Relation<Book[]>;

  // 1 lần mượn sách (có thể gồm nhiều sách) thì có thể có nhiều vé phạt nếu trễ hạn trả
  @OneToMany(() => Punish, (punish) => punish.bookBorrowingId)
  punishs: Relation<Punish[]>;
}
