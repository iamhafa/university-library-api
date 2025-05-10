import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { BookBorrowingService } from './book-borrowing.service';
import { BookBorrowingController } from './book-borrowing.controller';
import { BookBorrowing } from './entities/book-borrowing.entity';
import { BookBorrowingRepository } from './repositories/book-borrowing.repository';

@Module({
  imports: [DatabaseModule.forFeature([BookBorrowing])],
  controllers: [BookBorrowingController],
  providers: [BookBorrowingService, BookBorrowingRepository],
  exports: [BookBorrowingService],
})
export class BookBorrowingModule {}
