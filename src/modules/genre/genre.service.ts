import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreRepository } from './genre.repository';
import { Genre } from './entities/genre.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class GenreService {
  constructor(private readonly genreRepository: GenreRepository) {}

  findOne(id: number): Promise<Genre> {
    return this.genreRepository.findOne({ id });
  }

  findAll(): Promise<Genre[]> {
    return this.genreRepository.findAll();
  }

  createOne(createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genreRepository.createOne(createGenreDto);
  }

  updateOne(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    return this.genreRepository.findOneAndUpdate({ id }, updateGenreDto);
  }

  deleteOne(id: number): Promise<DeleteResult> {
    return this.genreRepository.findOneAndDelete({ id });
  }
}
