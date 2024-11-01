import { Column, Entity, JoinTable, ManyToMany, ManyToOne, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/base.entity';
import { Author } from '@/modules/author/entities/author.entity';
import { Genre } from '@/modules/genre/entities/genre.entity';
import { Publisher } from '@/modules/publisher/entities/publisher.entity';
import { BookBorrowing } from '@/modules/book-borrowing/entities/book-borrowing.entity';

@Entity()
export class Book extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  ISBN: string; // International Standard Book Number

  @Column()
  price: number;

  @Column({ nullable: true })
  totalPage: number;

  @Column()
  quantity: number;

  @Column()
  publishedDate: string;

  @Column({ nullable: true })
  description: string;

  // FK of Author
  @Column()
  authorId: number;

  @ManyToMany(() => Author, (author) => author.books)
  authors?: Relation<Author[]>;

  // FK of Genre
  @Column()
  genreId: number;

  @ManyToOne(() => Genre, (genre) => genre.books)
  genre?: Relation<Genre>;

  // FK of Publisher
  @Column()
  publisherId: number;

  @ManyToOne(() => Publisher, (publisher) => publisher.book)
  publisher: Relation<Publisher>;

  // Thể hiện quan hệ many to many với BookBorrowing
  @ManyToMany(() => BookBorrowing, (bookBorrowing) => bookBorrowing.books)
  @JoinTable({ name: 'book_borrowing_items' })
  bookBorrowings?: Relation<BookBorrowing[]>;
}
