import { Injectable } from '@nestjs/common';
import { CreateAuthorBookItemsDto } from './dto/create-author-book-items.dto';
import { UpdateAuthorBookItemsDto } from './dto/update-author-book-items.dto';
import { AuthorBookItemsRepository } from './author-book-items.repository';
import { AuthorBookItems } from './entities/author-book-items.entity';

@Injectable()
export class AuthorBookItemsService {
  constructor(private readonly authorBookRepository: AuthorBookItemsRepository) {}

  getAll(): Promise<AuthorBookItems[]> {
    return this.authorBookRepository.findAllWithRelations({ book: true, author: true });
  }

  getOne(id: number): Promise<AuthorBookItems> {
    return this.authorBookRepository.findOne({ id });
  }
}
