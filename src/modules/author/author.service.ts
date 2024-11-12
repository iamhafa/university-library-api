import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './author.repository';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  findOne(id: number): Promise<Author> {
    return this.authorRepository.findOne({ id });
  }

  findAll(): Promise<Author[]> {
    return this.authorRepository.findAll();
  }

  createOne(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorRepository.createOne(createAuthorDto);
  }

  updateOne(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    return this.authorRepository.findOneAndUpdate({ id }, updateAuthorDto);
  }
}
