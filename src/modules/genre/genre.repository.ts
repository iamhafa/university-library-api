import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/libs/database/base.repository';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreRepository extends BaseRepository<Genre> {
  protected readonly logger = new Logger(GenreRepository.name);

  constructor(@InjectRepository(Genre) private readonly genreRepository: Repository<Genre>) {
    super(genreRepository);
  }
}
