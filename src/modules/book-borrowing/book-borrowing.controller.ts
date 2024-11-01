import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookBorrowingService } from './book-borrowing.service';
import { CreateBookBorrowingDto } from './dto/create-order.dto';
import { UpdateBookBorrowingDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Quản lý mỗi lượt mượn sách (có thể gồm nhiều cuốn)')
@Controller('book-borrowing')
export class BookBorrowingController {
  constructor(private readonly orderService: BookBorrowingService) {}

  @Post()
  create(@Body() createBookBorrowingDto: CreateBookBorrowingDto) {
    return this.orderService.create(createBookBorrowingDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookBorrowingDto: UpdateBookBorrowingDto) {
    return this.orderService.update(+id, updateBookBorrowingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
