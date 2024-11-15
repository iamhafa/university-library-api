import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@/libs/database/database.module';
import { AuthorModule } from '@/modules/author/author.module';
import { BookModule } from '@/modules/book/book.module';
import { GenreModule } from '@/modules/genre/genre.module';
import { AuthorBookItemsModule } from '@/modules/author-book-items/author-book-items.module';
import { PublisherModule } from '@/modules/publisher/publisher.module';
import { BookBorrowingModule } from '@/modules/book-borrowing/book-borrowing.module';
import { MemberModule } from '@/modules/member/member.module';
import { BookBorrowingItemsModule } from '@/modules/book-borrowing-items/book-borrowing-items.module';
import { PunishModule } from '@/modules/punish/punish.module';
import { RuleModule } from '@/modules/rule/rule.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    PunishModule,
    RuleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
