import { PartialType } from '@nestjs/swagger';
import { CreateBookBorrowingDto } from './create-book-borrowing.dto';

export class UpdateBookBorrowingDto extends PartialType(CreateBookBorrowingDto) {}
