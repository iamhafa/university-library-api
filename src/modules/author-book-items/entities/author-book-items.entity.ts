import { Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/base.entity';
import { Author } from '@/modules/author/entities/author.entity';
import { Book } from '@/modules/book/entities/book.entity';

// Bảng trung gian của Author và Book (many to many)
@Entity()
export class AuthorBookItems extends BaseEntity {
  @PrimaryColumn()
  author_id: number;

  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn([{ name: 'author_id' }])
  author: Relation<Author>;

  @PrimaryColumn()
  book_id: number;

  @ManyToOne(() => Book, (book) => book.authors)
  @JoinColumn([{ name: 'book_id' }])
  book: Relation<Book>;
}
