import { Module } from '@nestjs/common';
import { BookBorrowingItemsService } from './book-borrowing-items.service';
import { BookBorrowingItemsController } from './book-borrowing-items.controller';
import { DatabaseModule } from '@/libs/database/database.module';
import { BookBorrowingItems } from './entities/book-borrowing-items.entity';
import { BookBorrowingItemsRepository } from './book-borrowing-items.repository';

@Module({
  imports: [DatabaseModule.forFeature([BookBorrowingItems])],
  controllers: [BookBorrowingItemsController],
  providers: [BookBorrowingItemsService, BookBorrowingItemsRepository],
  exports: [BookBorrowingItemsService],
})
export class BookBorrowingItemsModule {}
