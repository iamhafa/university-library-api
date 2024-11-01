import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthorBookService } from './author-book.service';
import { CreateAuthorBookDto } from './dto/create-author-book.dto';
import { UpdateAuthorBookDto } from './dto/update-author-book.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthorBook } from './entities/author-book.entity';

@ApiTags('Author - Book Management (bảng trung gian)')
@Controller('author-book')
export class AuthorBookController {
  constructor(private readonly authorBookService: AuthorBookService) {}

  @Get()
  getAll(): Promise<AuthorBook[]> {
    return this.authorBookService.getAll();
  }
}
