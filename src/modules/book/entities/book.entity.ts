import { Column, Entity, ManyToMany, ManyToOne, Relation } from 'typeorm';
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

  @ManyToMany(() => Author, (author) => author.books)
  authors?: Relation<Author[]>;

  // FK of Genre
  @Column()
  genre_id: number;

  @ManyToOne(() => Genre, (genre) => genre.books)
  genre?: Relation<Genre>;

  // FK of Publisher
  @Column()
  publisher_id: number;

  @ManyToOne(() => Publisher, (publisher) => publisher.book)
  publisher: Relation<Publisher>;

  // Thể hiện quan hệ many to many với BookBorrowing
  @ManyToMany(() => BookBorrowing, (bookBorrowing) => bookBorrowing.books)
  bookBorrowings?: Relation<BookBorrowing[]>;
}
