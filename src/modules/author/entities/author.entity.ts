import { Column, Entity, ManyToMany, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/entities/base.entity';
import { Book } from '@/modules/book/entities/book.entity';

@Entity()
export class Author extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @ManyToMany(() => Book, (book) => book.authors, { cascade: true })
  books?: Relation<Book[]>;
}
