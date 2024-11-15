import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AuthorBookItemsService } from './author-book-items.service';
import { CreateAuthorBookItemsDto } from './dto/create-author-book-items.dto';
import { UpdateAuthorBookItemsDto } from './dto/update-author-book-items.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthorBookItems } from './entities/author-book-items.entity';

@ApiTags('Author Book Items')
@Controller('author-book-items')
export class AuthorBookItemsController {
  constructor(private readonly authorBookService: AuthorBookItemsService) {}

  @Get()
  getAll(): Promise<AuthorBookItems[]> {
    return this.authorBookService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<AuthorBookItems> {
    return this.authorBookService.getOne(id);
  }
}
