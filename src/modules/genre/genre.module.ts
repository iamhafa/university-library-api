import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { GenreService } from './services/genre.service';
import { GenreController } from './controllers/genre.controller';
import { Genre } from './entities/genre.entity';
import { GenreRepository } from './repositories/genre.repository';

@Module({
  imports: [DatabaseModule.forFeature([Genre])],
  controllers: [GenreController],
  providers: [GenreService, GenreRepository],
})
export class GenreModule {}
