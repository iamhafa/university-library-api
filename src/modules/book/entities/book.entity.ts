import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, Relation } from 'typeorm';
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
  total_page: number;

  @Column()
  quantity: number;

  @Column()
  publish_date: Date;

  @Column({ nullable: true })
  description: string;

  // FK of Genre
  @Column()
  genre_id: number;
  @ManyToOne(() => Genre, (genre) => genre.books)
  @JoinColumn([{ name: 'genre_id' }])
  genre: Relation<Genre>;

  // FK of Publisher
  @Column()
  publisher_id: number;
  @ManyToOne(() => Publisher, (publisher) => publisher.book)
  @JoinColumn([{ name: 'publisher_id' }])
  publisher: Relation<Publisher>;

  // Thể hiện quan hệ many to many với Author
  @ManyToMany(() => Author, (author) => author.books)
  authors?: Relation<Author[]>;

  // Thể hiện quan hệ many to many với BookBorrowing
  @ManyToMany(() => BookBorrowing, (bookBorrowing) => bookBorrowing.books, { cascade: true })
  bookBorrowings: Relation<BookBorrowing[]>;
}
