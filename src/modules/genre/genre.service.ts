import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreRepository } from './genre.repository';
import { Genre } from './entities/genre.entity';
import { DeleteResult } from 'typeorm';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/pagination.dto';

@Injectable()
export class GenreService {
  constructor(private readonly genreRepository: GenreRepository) {}

  findOne(id: number): Promise<Genre> {
    return this.genreRepository.findOneBy({ id });
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<Genre> | Genre[]> {
    return this.genreRepository.findAll(paginationDto);
  }

  createOne(createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genreRepository.createOne(createGenreDto);
  }

  updateOne(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    return this.genreRepository.updateOne({ id }, updateGenreDto);
  }

  deleteOne(id: number): Promise<Genre> {
    return this.genreRepository.deleteOne({ id });
  }
}
