import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, Query } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Book } from '../entities/book.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';
import { BookAuthorItems } from '../entities/book-author-items.entity';
import { BookAuthorItemsService } from '../services/book-author-items.service';
import { ApiPaginationQuery } from '@/common/decorators/api-pagination-query.decorator';

@ApiTags('Sách')
@Controller('book')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly bookAuthorItemsService: BookAuthorItemsService,
  ) {}

  @Get()
  @ApiPaginationQuery()
  getAll(@Query() paginationDto: PaginationDto): Promise<TPagination<Book[]>> {
    return this.bookService.findAll(paginationDto);
  }

  @Get(':id/authors')
  getAuthors(@Param('id', ParseIntPipe) bookId: number): Promise<BookAuthorItems[]> {
    return this.bookAuthorItemsService.getByBookId(bookId);
  }

  @Post()
  createOne(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.createOne(createBookDto);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Put(':id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
    return this.bookService.updateOne(id, updateBookDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.deleteOne(id);
  }
}
