import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { FineService } from './fine.service';
import { FineController } from './fine.controller';
import { Fine } from './entities/fine.entity';
import { FineRepository } from './fine.repository';
import { BookBorrowingModule } from '../book-borrowing/book-borrowing.module';

@Module({
  imports: [DatabaseModule.forFeature([Fine]), BookBorrowingModule],
  controllers: [FineController],
  providers: [FineService, FineRepository],
})
export class FineModule {}
