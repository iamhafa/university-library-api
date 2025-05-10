import { Module } from '@nestjs/common';
import { BookBorrowingItemsService } from './book-borrowing-items.service';
import { BookBorrowingItemsController } from './book-borrowing-items.controller';
import { DatabaseModule } from '@/libs/database/database.module';
import { BookBorrowingItems } from './entities/book-borrowing-items.entity';
import { BookBorrowingItemsRepository } from './repositories/book-borrowing-items.repository';
import { BookBorrowingModule } from '../book-borrowing/book-borrowing.module';

@Module({
  imports: [DatabaseModule.forFeature([BookBorrowingItems]), BookBorrowingModule],
  controllers: [BookBorrowingItemsController],
  providers: [BookBorrowingItemsService, BookBorrowingItemsRepository],
  exports: [BookBorrowingItemsService],
})
export class BookBorrowingItemsModule {}
