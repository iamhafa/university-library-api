import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/entities/base.entity';
import { Book } from '@/modules/book/entities/book.entity';

@Entity()
export class Publisher extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true, default: null })
  address: string;

  @Column({ nullable: true, default: null })
  contact_number: string;

  @OneToMany(() => Book, (book) => book.publisher)
  readonly books?: Relation<Book[]>;
}
