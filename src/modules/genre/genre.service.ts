import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreRepository } from './repositories/genre.repository';
import { Genre } from './entities/genre.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';

@Injectable()
export class GenreService {
  constructor(private readonly genreRepository: GenreRepository) {}

  findOne(id: number): Promise<Genre> {
    return this.genreRepository.findOneById(id);
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<Genre[]>> {
    return this.genreRepository.findAll(paginationDto);
  }

  createOne(createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genreRepository.createOne(createGenreDto);
  }

  updateOne(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    return this.genreRepository.updateOneById(id, updateGenreDto);
  }

  deleteOne(id: number): Promise<Genre> {
    return this.genreRepository.deleteOneById(id);
  }
}
