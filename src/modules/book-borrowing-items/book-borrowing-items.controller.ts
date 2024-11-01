import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookBorrowingItemsService } from './book-borrowing-items.service';
import { CreateBookBookBorrowingDto } from './dto/create-book-order.dto';
import { UpdateBookBookBorrowingDto } from './dto/update-book-order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Quản lý các cuốn sách cho 1 lần mượn sách')
@Controller('book-borrowing-items')
export class BookBorrowingItemsController {
  constructor(private readonly bookBorrowingItemsService: BookBorrowingItemsService) {}
}
