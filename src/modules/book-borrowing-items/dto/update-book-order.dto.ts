import { PartialType } from '@nestjs/swagger';
import { CreateBookBookBorrowingDto } from './create-book-order.dto';

export class UpdateBookBookBorrowingDto extends PartialType(CreateBookBookBorrowingDto) {}
