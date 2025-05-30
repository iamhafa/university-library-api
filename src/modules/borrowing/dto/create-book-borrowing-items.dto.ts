import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateBookBorrowingItemsDto {
  @ApiProperty({ example: 5 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 1000 })
  @IsInt()
  price: number;

  @ApiProperty({ example: null, nullable: true })
  @IsDateString()
  @IsOptional()
  returned_date: Date;

  @ApiProperty({ example: 1 })
  @IsNumber()
  book_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  borrowing_id: number;
}
