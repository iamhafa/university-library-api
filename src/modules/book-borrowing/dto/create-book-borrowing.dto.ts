import { BaseDto } from '@/libs/database/dto/base.dto';
import { IsDate, IsNumber } from 'class-validator';

export class CreateBookBorrowingDto extends BaseDto {
  @IsDate()
  borrowing_date: Date;

  @IsDate()
  due_date: Date;

  @IsNumber()
  member_id: number;
}
