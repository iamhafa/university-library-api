import { DeleteResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateAuthorBookItemsDto } from './dto/create-author-book-items.dto';
import { UpdateAuthorBookItemsDto } from './dto/update-author-book-items.dto';
import { AuthorBookItemsRepository } from './author-book-items.repository';
import { AuthorBookItems } from './entities/author-book-items.entity';
import { PaginationDto } from '@/libs/database/pagination.dto';
import { TPagination } from '@/common/constants/type';

@Injectable()
export class AuthorBookItemsService {
  constructor(private readonly authorBookItemsRepository: AuthorBookItemsRepository) {}

  findOne(id: number): Promise<AuthorBookItems> {
    return this.authorBookItemsRepository.findOneById({ id });
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<AuthorBookItems> | AuthorBookItems[]> {
    return this.authorBookItemsRepository.findAll(paginationDto);
  }

  createOne(createAuthorBookItemsDto: CreateAuthorBookItemsDto): Promise<AuthorBookItems> {
    return this.authorBookItemsRepository.createOne(createAuthorBookItemsDto);
  }

  updateOne(id: number, updateAuthorDto: UpdateAuthorBookItemsDto): Promise<AuthorBookItems> {
    return this.authorBookItemsRepository.findOneByIdAndUpdate({ id }, updateAuthorDto);
  }

  deleteOne(id: number): Promise<DeleteResult> {
    return this.authorBookItemsRepository.findOneAndDelete({ id });
  }
}
