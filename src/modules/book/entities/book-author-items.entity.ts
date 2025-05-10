import { Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Author } from '@/modules/author/entities/author.entity';
import { Book } from '@/modules/book/entities/book.entity';
import { BaseEntity } from '@/libs/database/entities/base.entity';

// Bảng trung gian của Author và Book (many to many)
@Entity('book_author_items')
export class BookAuthorItems extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @PrimaryColumn()
  book_id: number;

  @PrimaryColumn()
  author_id: number;

  @ManyToOne(() => Book, (book) => book.authors, { eager: true })
  @JoinColumn({ name: 'book_id' })
  book?: Relation<Book>;

  @ManyToOne(() => Author, (author) => author.books, { eager: true })
  @JoinColumn({ name: 'author_id' })
  author?: Relation<Author>;
}
