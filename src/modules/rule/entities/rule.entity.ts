import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/libs/database/base.entity';
import { MEMBER_TYPE } from '@/common/constants';

// Lưu các quy định về thời gian mượn và số sách tối đa cho từng loại thành viên.
@Entity()
export class Rule extends BaseEntity {
  @Column({
    type: 'enum',
    enum: MEMBER_TYPE,
  })
  member_type: MEMBER_TYPE;

  @Column()
  max_borrowed_book: number;

  @Column()
  max_borrowed_day: number;
}
