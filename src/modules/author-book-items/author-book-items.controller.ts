import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthorBookItemsService } from './author-book-items.service';
import { AuthorBookItems } from './entities/author-book-items.entity';
import { CreateAuthorBookItemsDto } from './dto/create-author-book-items.dto';
import { UpdateAuthorBookItemsDto } from './dto/update-author-book-items.dto';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/pagination.dto';

@ApiTags('Author Book Items')
@Controller('author-book-items')
export class AuthorBookItemsController {
  constructor(private readonly authorBookItemsService: AuthorBookItemsService) {}

  @Get()
  getAll(@Query() paginationDto: PaginationDto): Promise<TPagination<AuthorBookItems[]>> {
    return this.authorBookItemsService.findAll(paginationDto);
  }

  @Post()
  createOne(@Body() createAuthorBookItemsDto: CreateAuthorBookItemsDto): Promise<AuthorBookItems> {
    return this.authorBookItemsService.createOne(createAuthorBookItemsDto);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<AuthorBookItems> {
    return this.authorBookItemsService.findOne(id);
  }

  @Put(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthorBookItemsDto: UpdateAuthorBookItemsDto,
  ): Promise<AuthorBookItems> {
    return this.authorBookItemsService.updateOne(id, updateAuthorBookItemsDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.authorBookItemsService.deleteOne(id);
  }
}
