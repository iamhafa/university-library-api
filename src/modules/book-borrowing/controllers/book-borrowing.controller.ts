import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, Query } from '@nestjs/common';
import { BookBorrowingService } from '../services/book-borrowing.service';
import { CreateBookBorrowingDto } from '../dto/create-book-borrowing.dto';
import { UpdateBookBorrowingDto } from '../dto/update-book-borrowing.dto';
import { BookBorrowing } from '../entities/book-borrowing.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';
import { BookBorrowingItems } from '../entities/book-borrowing-items.entity';
import { BookBorrowingItemsService } from '../services/book-borrowing-items.service';
import { CreateBookBorrowingItemsDto } from '../dto/create-book-borrowing-items.dto';
import { UpdateBookBorrowingItemsDto } from '../dto/update-book-borrowing-items.dto';

@ApiTags('Quản lý mỗi lượt mượn sách (có thể gồm nhiều cuốn)')
@Controller('book-borrowing')
export class BookBorrowingController {
  constructor(
    private readonly bookBorrowingService: BookBorrowingService,
    private readonly bookBorrowingItemsService: BookBorrowingItemsService,
  ) {}

  @Get()
  getAll(@Query() paginationDto: PaginationDto): Promise<TPagination<BookBorrowing[]>> {
    return this.bookBorrowingService.findAll(paginationDto);
  }

  @Get('items')
  getAllItems(@Query() paginationDto: PaginationDto): Promise<TPagination<BookBorrowingItems[]>> {
    return this.bookBorrowingItemsService.findAll(paginationDto);
  }

  @Post()
  createOne(@Body() createBookBorrowingDto: CreateBookBorrowingDto): Promise<BookBorrowing> {
    return this.bookBorrowingService.createOne(createBookBorrowingDto);
  }

  @Post('items')
  createOneItems(@Body() createBookBorrowingDto: CreateBookBorrowingItemsDto): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsService.createOne(createBookBorrowingDto);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<BookBorrowing> {
    return this.bookBorrowingService.findOne(id);
  }

  @Get('items/:id')
  getOneItems(@Param('id', ParseIntPipe) id: number): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsService.findOne(id);
  }

  @Put(':id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() updateBookBorrowingDto: UpdateBookBorrowingDto): Promise<BookBorrowing> {
    return this.bookBorrowingService.updateOne(id, updateBookBorrowingDto);
  }

  @Put('items/:id')
  updateOneItems(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookBorrowingItemsDto: UpdateBookBorrowingItemsDto,
  ): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsService.updateOne(id, updateBookBorrowingItemsDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookBorrowingService.deleteOne(id);
  }

  @Delete('items/:id')
  deleteOneItems(@Param('id', ParseIntPipe) id: number) {
    return this.bookBorrowingItemsService.deleteOne(id);
  }
}
