import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { Genre } from './entities/genre.entity';
import { GenreRepository } from './genre.repository';

@Module({
  imports: [DatabaseModule.forFeature([Genre])],
  controllers: [GenreController],
  providers: [GenreService, GenreRepository],
})
export class GenreModule {}
