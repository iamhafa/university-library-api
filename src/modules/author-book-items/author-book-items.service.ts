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
    return this.authorBookItemsRepository.findOneBy({ id });
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<AuthorBookItems[]>> {
    return this.authorBookItemsRepository.findAll(paginationDto);
  }

  createOne(createAuthorBookItemsDto: CreateAuthorBookItemsDto): Promise<AuthorBookItems> {
    return this.authorBookItemsRepository.createOne(createAuthorBookItemsDto);
  }

  updateOne(id: number, updateAuthorDto: UpdateAuthorBookItemsDto): Promise<AuthorBookItems> {
    return this.authorBookItemsRepository.updateOneBy({ id }, updateAuthorDto);
  }

  deleteOne(id: number): Promise<AuthorBookItems> {
    return this.authorBookItemsRepository.deleteOneBy({ id });
  }
}
