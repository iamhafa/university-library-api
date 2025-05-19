import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { BookService } from './services/book.service';
import { BookController } from './controllers/book.controller';
import { Book } from './entities/book.entity';
import { BookRepository } from './repositories/book.repository';
import { BookAuthorItems } from './entities/book-author-items.entity';
import { BookAuthorItemsRepository } from './repositories/book-author-items.repository';
import { BookAuthorItemsService } from './services/book-author-items.service';

@Module({
  imports: [DatabaseModule.forFeature([Book, BookAuthorItems])],
  controllers: [BookController],
  providers: [BookService, BookAuthorItemsService, BookRepository, BookAuthorItemsRepository],
})
export class BookModule {}
