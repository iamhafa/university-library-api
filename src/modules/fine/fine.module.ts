import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { FineService } from './fine.service';
import { FineController } from './fine.controller';
import { Fine } from './entities/fine.entity';
import { FineRepository } from './repositories/fine.repository';
import { BookBorrowingModule } from '../book-borrowing/book-borrowing.module';
import { BookBorrowingItemsModule } from '../book-borrowing-items/book-borrowing-items.module';

@Module({
  imports: [DatabaseModule.forFeature([Fine]), BookBorrowingModule, BookBorrowingItemsModule],
  controllers: [FineController],
  providers: [FineService, FineRepository],
})
export class FineModule {}
