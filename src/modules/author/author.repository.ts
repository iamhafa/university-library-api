import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/libs/database/repositories/base.repository';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorRepository extends BaseRepository<Author> {
  constructor(@InjectRepository(Author) protected readonly authorRepository: Repository<Author>) {
    super(authorRepository);
  }

  findByQueryBuilder(alias: string) {
    return this.entityRepository.createQueryBuilder(alias);
  }
}
