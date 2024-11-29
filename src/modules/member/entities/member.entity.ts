import { Column, CreateDateColumn, Entity, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/base.entity';
import { BookBorrowing } from '@/modules/book-borrowing/entities/book-borrowing.entity';
import { MEMBER_TYPE } from '@/common/constants';

// Thành viên của thư viện (sinh viên của trường có thể mượn sách)
@Entity()
export class Member extends BaseEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({
    // default password for all new account
    default: '12345',
    // not return when find data via API
    select: false,
  })
  password: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({
    type: 'enum',
    enum: MEMBER_TYPE,
    default: MEMBER_TYPE.UNDERGRADUATE_STUDENT,
  })
  member_type: string;

  @Column({ nullable: true })
  address: string;

  // ngày trở thành member
  @CreateDateColumn()
  enrollment_date: Date;

  @OneToMany(() => BookBorrowing, (bookBorrowing) => bookBorrowing.member_id)
  bookBorrowings?: Relation<BookBorrowing[]>;
}
