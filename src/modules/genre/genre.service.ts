import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreRepository } from './genre.repository';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(private readonly genreRepository: GenreRepository) {}

  getAll(): Promise<Genre[]> {
    return this.genreRepository.findAll();
  }
}
