import { Column, Entity, JoinTable, ManyToMany, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/base.entity';
import { Book } from '@/modules/book/entities/book.entity';

@Entity()
export class Author extends BaseEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @ManyToMany(() => Book, (book) => book.authors, { cascade: true })
  books?: Relation<Book[]>;
}
