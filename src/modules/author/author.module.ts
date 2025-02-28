import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { Author } from './entities/author.entity';
import { AuthorRepository } from './author.repository';

@Module({
  imports: [DatabaseModule.forFeature([Author])],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository],
  exports: [AuthorService],
})
export class AuthorModule {}
