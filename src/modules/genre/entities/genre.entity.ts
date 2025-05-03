import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/entities/base.entity';
import { Book } from '@/modules/book/entities/book.entity';

// Thể loại sách
@Entity()
export class Genre extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Book, (book) => book.genre)
  books?: Relation<Book[]>;
}
