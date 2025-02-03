import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, Query } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '@/libs/database/pagination.dto';
import { TPagination } from '@/common/constants/type';

@ApiTags('Quản lý tác giả')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAll(@Query() paginationDto: PaginationDto): Promise<TPagination<Author>> {
    return this.authorService.findAll(paginationDto);
  }

  @Post()
  createOne(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorService.createOne(createAuthorDto);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    return this.authorService.findOne(id);
  }

  @Put(':id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    return this.authorService.updateOne(id, updateAuthorDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.authorService.deleteOne(id);
  }
}
