import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiTags } from '@nestjs/swagger';
import { EndDateQuery, StartDateQuery } from '@/common/decorators/date-range-query.decorator';
import { ApiDateRangeQuery } from '@/common/decorators/api-date-range-query.decorator';

@ApiTags('Thống kê báo cáo')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('borrowing-monthly-statistics')
  @ApiDateRangeQuery()
  borrowingMonthlyStatistics(@StartDateQuery() startDate: string, @EndDateQuery() endDate: string) {
    return this.reportService.borrowingMonthlyStatistics(startDate, endDate);
  }

  @Get('top-10-most-borrowed-books')
  @ApiDateRangeQuery()
  getTop10MostBorrowedBooks(@StartDateQuery() startDate: string, @EndDateQuery() endDate: string) {
    return this.reportService.getTop10MostBorrowedBooks(startDate, endDate);
  }
}
