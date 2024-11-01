import { Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/base.entity';
import { Author } from '@/modules/author/entities/author.entity';
import { Book } from '@/modules/book/entities/book.entity';

// Bảng trung gian của Author và Book (many to many)
@Entity({ name: 'author_book' })
export class AuthorBook extends BaseEntity {
  @PrimaryColumn()
  authorId: number;

  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn([{ name: 'authorId' }])
  author: Relation<Author>;

  @PrimaryColumn()
  bookId: number;

  @ManyToOne(() => Book, (book) => book.authors)
  @JoinColumn([{ name: 'bookId' }])
  book: Relation<Book>;
}
