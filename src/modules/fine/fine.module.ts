import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { FineService } from './services/fine.service';
import { FineController } from './controllers/fine.controller';
import { Fine } from './entities/fine.entity';
import { FineRepository } from './repositories/fine.repository';
import { BookBorrowingModule } from '../book-borrowing/book-borrowing.module';

@Module({
  imports: [DatabaseModule.forFeature([Fine]), BookBorrowingModule],
  controllers: [FineController],
  providers: [FineService, FineRepository],
})
export class FineModule {}
