import { CronJob } from 'cron';
import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { BookBorrowingModule } from '@/modules/book-borrowing/book-borrowing.module';
import { FineTicketModule } from '@/modules/fine-ticket/fine-ticket.module';
import { MailModule } from '@/mail/mail.module';

@Module({
  imports: [
    BookBorrowingModule,
    FineTicketModule,
    //  MailModule
  ],
  providers: [TasksService],
})
export class TasksModule implements OnApplicationBootstrap {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}
  private readonly logger = new Logger(TasksModule.name);

  onApplicationBootstrap(): void {
    const cronJobs: Map<string, CronJob> = this.schedulerRegistry.getCronJobs();
    const jobs: string[] = Array.from(cronJobs.keys());

    this.logger.verbose(`List of cron jobs was register: ${JSON.stringify(jobs)}.`);
  }
}
