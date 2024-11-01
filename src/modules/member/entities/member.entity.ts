import { Column, CreateDateColumn, Entity, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/base.entity';
import { BookBorrowing } from '@/modules/book-borrowing/entities/book-borrowing.entity';
import { EMemberType } from '@/common/constants';

// Thành viên của thư viện (sinh viên của trường có thể mượn sách)
@Entity()
export class Member extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

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
  phoneNumber: number;

  @Column({
    type: 'enum',
    enum: EMemberType,
    default: EMemberType.UNDERGRADUATE_STUDENT,
  })
  memberType: string;

  @Column({ nullable: true })
  address: string;

  // ngày trở thành member
  @CreateDateColumn()
  enrollmentDate: Date;

  @OneToMany(() => BookBorrowing, (bookBorrowing) => bookBorrowing.memberId)
  bookBorrowings?: Relation<BookBorrowing[]>;
}
