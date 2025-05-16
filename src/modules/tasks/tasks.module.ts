import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { BookBorrowingModule } from '../book-borrowing/book-borrowing.module';
import { FineTicketModule } from '../fine-ticket/fine-ticket.module';

@Module({
  imports: [BookBorrowingModule, FineTicketModule],
  providers: [TasksService],
})
export class TasksModule {}
