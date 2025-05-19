import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { AuthorService } from './services/author.service';
import { AuthorController } from './controllers/author.controller';
import { Author } from './entities/author.entity';
import { AuthorRepository } from './repositories/author.repository';

@Module({
  imports: [DatabaseModule.forFeature([Author])],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository],
  exports: [AuthorService, AuthorRepository],
})
export class AuthorModule {}
