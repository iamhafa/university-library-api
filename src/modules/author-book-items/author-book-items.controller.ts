import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthorBookItemsService } from './author-book-items.service';
import { AuthorBookItems } from './entities/author-book-items.entity';
import { CreateAuthorBookItemsDto } from './dto/create-author-book-items.dto';
import { UpdateAuthorBookItemsDto } from './dto/update-author-book-items.dto';

@ApiTags('Author Book Items')
@Controller('author-book-items')
export class AuthorBookItemsController {
  constructor(private readonly authorBookService: AuthorBookItemsService) {}

  @Get()
  getAll(): Promise<AuthorBookItems[]> {
    return this.authorBookService.findAll();
  }

  @Post()
  createOne(@Body() createAuthorBookItemsDto: CreateAuthorBookItemsDto): Promise<AuthorBookItems> {
    return this.authorBookService.createOne(createAuthorBookItemsDto);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<AuthorBookItems> {
    return this.authorBookService.findOne(id);
  }

  @Put(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthorBookItemsDto: UpdateAuthorBookItemsDto,
  ): Promise<AuthorBookItems> {
    return this.authorBookService.updateOne(id, updateAuthorBookItemsDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.authorBookService.deleteOne(id);
  }
}
