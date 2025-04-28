import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, Query } from '@nestjs/common';
import { BookBorrowingItemsService } from './book-borrowing-items.service';
import { CreateBookBorrowingItemsDto } from './dto/create-book-borrowing-items.dto';
import { UpdateBookBookBorrowingDto } from './dto/update-book-borrowing-items.dto';
import { BookBorrowingItems } from './entities/book-borrowing-items.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/pagination.dto';

@ApiTags('Quản lý các cuốn sách cho 1 lần mượn sách')
@Controller('book-borrowing-items')
export class BookBorrowingItemsController {
  constructor(private readonly bookBorrowingItemsService: BookBorrowingItemsService) {}

  @Get()
  getAll(@Query() paginationDto: PaginationDto): Promise<TPagination<BookBorrowingItems[]>> {
    return this.bookBorrowingItemsService.findAll(paginationDto);
  }

  @Post()
  createOne(@Body() createBookBorrowingDto: CreateBookBorrowingItemsDto): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsService.createOne(createBookBorrowingDto);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsService.findOne(id);
  }

  @Put(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookBorrowingDto: UpdateBookBookBorrowingDto,
  ): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsService.updateOne(id, updateBookBorrowingDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookBorrowingItemsService.deleteOne(id);
  }
}
