import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entities/book.entity';
import { BookRepository } from './book.repository';
import { AuthorModule } from '../author/author.module';
import { BookAuthorItems } from './entities/book-author-items.entity';

@Module({
  imports: [DatabaseModule.forFeature([Book, BookAuthorItems]), AuthorModule],
  controllers: [BookController],
  providers: [BookService, BookRepository],
  exports: [BookService],
})
export class BookModule {}
