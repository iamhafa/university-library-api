import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { BorrowingModule } from '@/modules/borrowing/borrowing.module';

@Module({
  imports: [BorrowingModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
