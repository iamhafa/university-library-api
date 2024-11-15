import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { AuthorBookItemsService } from './author-book-items.service';
import { AuthorBookItemsController } from './author-book-items.controller';
import { AuthorBookItems } from './entities/author-book-items.entity';
import { AuthorBookItemsRepository } from './author-book-items.repository';
import { AuthorModule } from '@/modules/author/author.module';
import { BookModule } from '@/modules/book/book.module';

@Module({
  imports: [DatabaseModule.forFeature([AuthorBookItems]), AuthorModule, BookModule],
  controllers: [AuthorBookItemsController],
  providers: [AuthorBookItemsService, AuthorBookItemsRepository],
})
export class AuthorBookItemsModule {}
