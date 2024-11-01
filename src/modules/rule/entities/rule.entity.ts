import { EMemberType } from '@/common/constants';
import { BaseEntity } from '@/libs/database/base.entity';
import { Column, Entity } from 'typeorm';

// Lưu các quy định về thời gian mượn và số sách tối đa cho từng loại thành viên.
@Entity()
export class Rule extends BaseEntity {
  @Column({
    type: 'enum',
    enum: EMemberType,
  })
  memberType: EMemberType;

  @Column()
  maxBorrowBooks: number;

  @Column()
  maxBorrowDays: number;
}
