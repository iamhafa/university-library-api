import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/entities/base.entity';
import { Book } from '@/modules/book/entities/book.entity';

@Entity()
export class Author extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @OneToMany(() => Book, (book) => book.authors, { cascade: true })
  readonly books?: Relation<Book[]>;
}
