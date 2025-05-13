import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, Query } from '@nestjs/common';
import { AuthorService } from '../services/author.service';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { Author } from '../entities/author.entity';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';
import { TPagination } from '@/common/constants/type';
import { Roles } from '@/decorators/roles.decorator';
import { ROLE } from '@/common/constants/enum';
import { ApiPaginationQuery } from '@/decorators/api-pagination-query.decorator';

@ApiTags('Tác giả')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  @ApiPaginationQuery()
  // @Roles([ROLE.ADMIN, ROLE.USER])
  getAll(@Query() paginationDto: PaginationDto): Promise<TPagination<Author[]>> {
    return this.authorService.findAll(paginationDto);
  }

  @Get('search')
  search(@Query('q') query?: string): Promise<Author[]> {
    return this.authorService.searchByQuery(query);
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
  deleteOne(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    return this.authorService.deleteOne(id);
  }
}
