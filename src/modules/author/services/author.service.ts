import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { AuthorRepository } from '../repositories/author.repository';
import { Author } from '../entities/author.entity';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';
import { TPagination } from '@/common/constants/type';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  findOne(id: number): Promise<Author> {
    return this.authorRepository.findOneById(id);
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<Author[]>> {
    return this.authorRepository.findAll({ paginationDto });
  }

  searchByQuery(query: string): Promise<Author[]> {
    return this.authorRepository
      .createQueryBuilder('a')
      .where('LOWER(a.name) LIKE LOWER(:query)', { query: `%${query}%` })
      .take(10)
      .getMany();
  }

  createOne(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorRepository.createOne(createAuthorDto);
  }

  updateOne(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    return this.authorRepository.updateOneById(id, updateAuthorDto);
  }

  deleteOne(id: number): Promise<Author> {
    return this.authorRepository.deleteOneById(id);
  }
}
