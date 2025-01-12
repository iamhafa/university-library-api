import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/base.entity';
import { Book } from '@/modules/book/entities/book.entity';

@Entity()
export class Publisher extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  contact_number: number;

  @OneToMany(() => Book, (book) => book.publisher)
  book?: Relation<Book[]>;
}
