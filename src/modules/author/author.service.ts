import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './author.repository';
import { Author } from './entities/author.entity';
import { PaginationDto } from '@/libs/database/pagination.dto';
import { TPagination } from '@/common/constants/type';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  findOne(id: number): Promise<Author> {
    return this.authorRepository.findOneById({ id });
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<Author> | Author[]> {
    return this.authorRepository.findAll(paginationDto);
  }

  createOne(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorRepository.createOne(createAuthorDto);
  }

  updateOne(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    return this.authorRepository.findOneByIdAndUpdate({ id }, updateAuthorDto);
  }

  deleteOne(id: number): Promise<DeleteResult> {
    return this.authorRepository.findOneAndDelete({ id });
  }
}
