import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { AuthorBookService } from './author-book.service';
import { AuthorBookController } from './author-book.controller';
import { AuthorBook } from './entities/author-book.entity';
import { AuthorBookRepository } from './author-book.repository';
import { AuthorModule } from '@/modules/author/author.module';
import { BookModule } from '@/modules/book/book.module';

@Module({
  imports: [DatabaseModule.forFeature([AuthorBook]), AuthorModule, BookModule],
  controllers: [AuthorBookController],
  providers: [AuthorBookService, AuthorBookRepository],
})
export class AuthorBookModule {}
