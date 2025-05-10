import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';

export class CreateBookBorrowingDto {
  @IsDate()
  @ApiProperty()
  borrowing_date: Date;

  @IsDate()
  @ApiProperty()
  due_date: Date;

  @IsNumber()
  @ApiProperty()
  member_id: number;
}
