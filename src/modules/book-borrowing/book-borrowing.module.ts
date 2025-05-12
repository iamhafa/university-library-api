import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { BookBorrowingService } from './services/book-borrowing.service';
import { BookBorrowingController } from './controllers/book-borrowing.controller';
import { BookBorrowing } from './entities/book-borrowing.entity';
import { BookBorrowingRepository } from './repositories/book-borrowing.repository';
import { BookBorrowingItems } from './entities/book-borrowing-items.entity';
import { BookBorrowingItemsService } from './services/book-borrowing-items.service';
import { BookBorrowingItemsRepository } from './repositories/book-borrowing-items.repository';

@Module({
  imports: [DatabaseModule.forFeature([BookBorrowing, BookBorrowingItems])],
  controllers: [BookBorrowingController],
  providers: [BookBorrowingService, BookBorrowingItemsService, BookBorrowingRepository, BookBorrowingItemsRepository],
  exports: [BookBorrowingService, BookBorrowingItemsService],
})
export class BookBorrowingModule {}
