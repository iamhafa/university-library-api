import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { BookBorrowingModule } from '@/modules/book-borrowing/book-borrowing.module';

@Module({
  imports: [BookBorrowingModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
