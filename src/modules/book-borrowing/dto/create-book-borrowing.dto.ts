import { BaseDto } from '@/libs/database/dto/base.dto';
import { IsDate } from 'class-validator';

export class CreateBookBorrowingDto extends BaseDto {
  @IsDate()
  borrowing_date: Date;

  @IsDate()
  due_date: Date;
}
