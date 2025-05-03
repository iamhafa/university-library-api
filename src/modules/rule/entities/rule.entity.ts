import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/libs/database/entities/base.entity';
import { MEMBER_TYPE } from '@/common/constants/enum';

// Lưu các quy định về thời gian mượn và số sách tối đa cho từng loại thành viên.
@Entity()
export class Rule extends BaseEntity {
  @Column({
    type: 'enum',
    enum: MEMBER_TYPE,
  })
  member_type: MEMBER_TYPE;

  @Column({ type: 'integer' })
  max_borrowed_book: number;

  @Column({ type: 'integer' })
  max_borrowed_day: number;
}
