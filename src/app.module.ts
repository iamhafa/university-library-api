import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from '@/libs/database/database.module';
import { AuthorModule } from '@/modules/author/author.module';
import { BookModule } from '@/modules/book/book.module';
import { GenreModule } from '@/modules/genre/genre.module';
import { PublisherModule } from '@/modules/publisher/publisher.module';
import { BookBorrowingModule } from '@/modules/book-borrowing/book-borrowing.module';
import { MemberModule } from '@/modules/member/member.module';
import { FineTicketModule } from '@/modules/fine-ticket/fine-ticket.module';
import { RuleModule } from '@/modules/rule/rule.module';
import { MailModule } from '@/mail/mail.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './core/guards/role.guard';
import { AuthMiddleware } from './core/middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: '.env.development', // Chỉ định tệp .env.development ở root scope
    }),
    ScheduleModule.forRoot({ cronJobs: true }),
    JwtModule,
    // MailModule,
    /* custom database module */
    DatabaseModule,
    /**
     * list other modules (like table)
     */
    AuthorModule,
    MemberModule,
    GenreModule,
    PublisherModule,
    BookModule,
    BookBorrowingModule,
    FineTicketModule,
    RuleModule,
    TasksModule,
  ],
  providers: [
    // {
    //   provide: APP_GUARD, // auto inject reflector
    //   useClass: RoleGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
