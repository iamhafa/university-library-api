import { Type } from 'class-transformer';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { CreateBookBorrowingItemsDto } from './create-book-borrowing-items.dto';

class UpdateItemsWithIdDto extends OmitType(PartialType(CreateBookBorrowingItemsDto), ['borrowing_id']) {
  @ApiProperty({ default: 1 })
  @IsNumber()
  id: number;
}

export class BulkUpdateBookBorrowingItemsDto {
  @ApiProperty({ type: [UpdateItemsWithIdDto] })
  @IsArray({ message: 'Danh sách mượn phải là một mảng' })
  @ValidateNested({ each: true })
  @Type(() => UpdateItemsWithIdDto)
  items: UpdateItemsWithIdDto[];
}
