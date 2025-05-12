import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';

export class CreateBookBorrowingDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  member_id: number;

  @IsDateString()
  @ApiProperty({ example: '2025-05-01' })
  borrowing_date: Date;

  @IsDateString()
  @ApiProperty({ example: '2025-05-12' })
  due_date: Date;
}
