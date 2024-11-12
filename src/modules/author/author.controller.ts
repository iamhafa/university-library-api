import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Quản lý tác giả')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    return this.authorService.findOne(id);
  }

  @Get()
  findAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Post()
  createOne(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorService.createOne(createAuthorDto);
  }

  @Put(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    return this.authorService.updateOne(id, updateAuthorDto);
  }
}
