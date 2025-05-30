import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { BorrowingService } from './services/borrowing.service';
import { BorrowingController } from './controllers/borrowing.controller';
import { Borrowing } from './entities/borrowing.entity';
import { BorrowingRepository } from './repositories/borrowing.repository';
import { BookBorrowingItems } from './entities/book-borrowing-items.entity';
import { BookBorrowingItemsService } from './services/book-borrowing-items.service';
import { BookBorrowingItemsRepository } from './repositories/book-borrowing-items.repository';

@Module({
  imports: [DatabaseModule.forFeature([Borrowing, BookBorrowingItems])],
  controllers: [BorrowingController],
  providers: [BorrowingService, BookBorrowingItemsService, BorrowingRepository, BookBorrowingItemsRepository],
  exports: [BorrowingRepository, BookBorrowingItemsRepository],
})
export class BorrowingModule {}
