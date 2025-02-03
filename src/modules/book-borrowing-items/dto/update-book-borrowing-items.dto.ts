import { PartialType } from '@nestjs/swagger';
import { CreateBookBorrowingItemsDto } from './create-book-borrowing-items.dto';

export class UpdateBookBookBorrowingDto extends PartialType(CreateBookBorrowingItemsDto) {}
