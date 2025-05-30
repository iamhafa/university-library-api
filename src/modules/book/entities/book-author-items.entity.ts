import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Author } from '@/modules/author/entities/author.entity';
import { Book } from '@/modules/book/entities/book.entity';
import { BaseEntity } from '@/libs/database/entities/base.entity';

// Bảng trung gian của Author và Book (many to many)
@Entity()
export class BookAuthorItems extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  book_id: number;

  @Column()
  author_id: number;

  @ManyToOne(() => Book, (book) => book.authors)
  @JoinColumn({ name: 'book_id' })
  readonly book?: Relation<Book>;

  @ManyToOne(() => Author, (author) => author.books, { eager: true })
  @JoinColumn({ name: 'author_id' })
  readonly author?: Relation<Author>;
}
