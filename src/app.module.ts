import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from '@/libs/database/database.module';
import { AuthorModule } from '@/modules/author/author.module';
import { BookModule } from '@/modules/book/book.module';
import { GenreModule } from '@/modules/genre/genre.module';
import { AuthorBookItemsModule } from '@/modules/author-book-items/author-book-items.module';
import { PublisherModule } from '@/modules/publisher/publisher.module';
import { BookBorrowingModule } from '@/modules/book-borrowing/book-borrowing.module';
import { MemberModule } from '@/modules/member/member.module';
import { BookBorrowingItemsModule } from '@/modules/book-borrowing-items/book-borrowing-items.module';
import { FineModule } from '@/modules/fine/fine.module';
import { RuleModule } from '@/modules/rule/rule.module';
import { MailModule } from '@/mail/mail.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './core/guards/role.guard';
import { AuthMiddleware } from './core/middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot({ cronJobs: process.env.CRON_JOBS === 'true' }),
    JwtModule,
    // MailModule,
    /* custom database module */
    DatabaseModule,
    /**
     * list other modules (like table)
     */
    AuthorModule,
    AuthorBookItemsModule,
    MemberModule,
    GenreModule,
    PublisherModule,
    BookModule,
    BookBorrowingModule,
    BookBorrowingItemsModule,
    FineModule,
    RuleModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
