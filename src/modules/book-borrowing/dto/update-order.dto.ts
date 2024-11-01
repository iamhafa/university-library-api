import { PartialType } from '@nestjs/swagger';
import { CreateBookBorrowingDto } from './create-order.dto';

export class UpdateBookBorrowingDto extends PartialType(CreateBookBorrowingDto) {}
