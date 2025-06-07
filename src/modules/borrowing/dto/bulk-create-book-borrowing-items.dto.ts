import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateBookBorrowingItemsDto } from './create-book-borrowing-items.dto';

export class BulkCreateBookBorrowingItemsDto {
  @ApiProperty({ type: [CreateBookBorrowingItemsDto] })
  @IsArray({ message: 'Danh sách mượn phải là một mảng' })
  @ValidateNested({ each: true })
  @Type(() => CreateBookBorrowingItemsDto)
  items: CreateBookBorrowingItemsDto[];
}
