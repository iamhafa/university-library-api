import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, Query } from '@nestjs/common';
import { BorrowingService } from '../services/borrowing.service';
import { CreateBorrowingDto } from '../dto/create-borrowing.dto';
import { UpdateBorrowingDto } from '../dto/update-borrowing.dto';
import { Borrowing } from '../entities/borrowing.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';
import { BookBorrowingItems } from '../entities/book-borrowing-items.entity';
import { BookBorrowingItemsService } from '../services/book-borrowing-items.service';
import { CreateBookBorrowingItemsDto } from '../dto/create-book-borrowing-items.dto';
import { UpdateBookBorrowingItemsDto } from '../dto/update-book-borrowing-items.dto';
import { ApiPaginationQuery } from '@/common/decorators/api-pagination-query.decorator';

@ApiTags('Lượt mượn sách')
@Controller('borrowing')
export class BorrowingController {
  constructor(
    private readonly borrowingService: BorrowingService,
    private readonly bookBorrowingItemsService: BookBorrowingItemsService,
  ) {}

  @Get()
  @ApiPaginationQuery()
  getAll(@Query() paginationDto: PaginationDto): Promise<TPagination<Borrowing[]>> {
    return this.borrowingService.findAll(paginationDto);
  }

  @Get('items')
  getAllItems(@Query() paginationDto: PaginationDto): Promise<TPagination<BookBorrowingItems[]>> {
    return this.bookBorrowingItemsService.findAll(paginationDto);
  }

  @Post()
  createOne(@Body() createBookBorrowingDto: CreateBorrowingDto): Promise<Borrowing> {
    return this.borrowingService.createOne(createBookBorrowingDto);
  }

  @Post('items')
  createOneItems(@Body() createBookBorrowingItemsDto: CreateBookBorrowingItemsDto): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsService.createOne(createBookBorrowingItemsDto);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Borrowing> {
    return this.borrowingService.findOne(id);
  }

  @Get('items/:id')
  getOneItems(@Param('id', ParseIntPipe) id: number): Promise<BookBorrowingItems> {
    return this.bookBorrowingItemsService.findOne(id);
  }

  @Put(':id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() updateBorrowingDto: UpdateBorrowingDto): Promise<Borrowing> {
    return this.borrowingService.updateOne(id, updateBorrowingDto);
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
    return this.borrowingService.deleteOne(id);
  }

  @Delete('items/:id')
  deleteOneItems(@Param('id', ParseIntPipe) id: number) {
    return this.bookBorrowingItemsService.deleteOne(id);
  }
}
