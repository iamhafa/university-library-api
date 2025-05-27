import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '@/libs/database/entities/base.entity';
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

  @Column({ type: 'text', default: null })
  image_url: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  total_page: number;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: null })
  publish_date: Date;

  @Column({ nullable: true })
  description: string;

  // FK of Genre
  @Column()
  genre_id: number;

  // FK of Publisher
  @Column()
  publisher_id: number;

  // Thể hiện quan hệ many to many với Author
  @OneToMany(() => Author, (author) => author.books)
  readonly authors?: Relation<Author[]>;

  @ManyToOne(() => Genre, (genre) => genre.books)
  @JoinColumn({ name: 'genre_id' })
  readonly genre?: Relation<Genre>;

  @ManyToOne(() => Publisher, (publisher) => publisher.books)
  @JoinColumn({ name: 'publisher_id' })
  readonly publisher?: Relation<Publisher>;

  // Thể hiện quan hệ many to many với BookBorrowing
  @OneToMany(() => BookBorrowing, (bookBorrowing) => bookBorrowing.books)
  readonly bookBorrowings?: Relation<BookBorrowing[]>;
}
