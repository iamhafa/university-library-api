import { BORROWING_STATUS } from '@/common/constants/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreateBookBorrowingItemsDto {
  @ApiProperty({ example: 5 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  total_price: number;

  @ApiProperty({ example: null, nullable: true })
  @IsDateString()
  @IsOptional()
  returned_date: Date;

  @ApiProperty({ enum: BORROWING_STATUS })
  @IsEnum(BORROWING_STATUS)
  status: BORROWING_STATUS;

  @ApiProperty({ example: 1 })
  @IsNumber()
  book_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  book_borrowing_id: number;
}
