import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { FineTicketService } from './services/fine-ticket.service';
import { FineTicketController } from './controllers/fine-ticket.controller';
import { FineTicket } from './entities/fine-ticket.entity';
import { FineTicketRepository } from './repositories/fine-ticket.repository';
import { BookBorrowingModule } from '../book-borrowing/book-borrowing.module';

@Module({
  imports: [DatabaseModule.forFeature([FineTicket]), BookBorrowingModule],
  controllers: [FineTicketController],
  providers: [FineTicketService, FineTicketRepository],
  exports: [FineTicketRepository],
})
export class FineTicketModule {}
