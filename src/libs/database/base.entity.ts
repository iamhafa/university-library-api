import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export abstract class BaseEntity<T = any> {
  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }

  // tự động tăng từ 1 => ...
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
