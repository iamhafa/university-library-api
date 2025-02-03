import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthorBookItemsService } from './author-book-items.service';
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
