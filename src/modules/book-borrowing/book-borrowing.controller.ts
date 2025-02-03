import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { BookBorrowingService } from './book-borrowing.service';
import { CreateBookBorrowingDto } from './dto/create-book-borrowing.dto';
import { UpdateBookBorrowingDto } from './dto/update-book-borrowing.dto';
import { BookBorrowing } from './entities/book-borrowing.entity';

@ApiTags('Quản lý mỗi lượt mượn sách (có thể gồm nhiều cuốn)')
@Controller('book-borrowing')
export class BookBorrowingController {
  constructor(private readonly bookBorrowingService: BookBorrowingService) {}

  @Get()
  getAll(): Promise<BookBorrowing[]> {
    return this.bookBorrowingService.findAll();
  }

  @Post()
  createOne(@Body() createBookBorrowingDto: CreateBookBorrowingDto): Promise<BookBorrowing> {
    return this.bookBorrowingService.createOne(createBookBorrowingDto);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<BookBorrowing> {
    return this.bookBorrowingService.findOne(id);
  }

  @Put(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookBorrowingDto: UpdateBookBorrowingDto,
  ): Promise<BookBorrowing> {
    return this.bookBorrowingService.updateOne(id, updateBookBorrowingDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookBorrowingService.deleteOne(id);
  }
}
