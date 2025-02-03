import { BORROWING_STATUS } from '@/common/constants/enum';
import { BaseDto } from '@/libs/database/base.dto';
import { IsDate, IsEnum, IsNumber } from 'class-validator';

export class CreateBookBorrowingItemsDto extends BaseDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  total_price: number;

  @IsDate()
  returned_date: Date;

  @IsEnum(BORROWING_STATUS)
  status: BORROWING_STATUS;

  @IsNumber()
  book_id: number;

  @IsNumber()
  book_borrowing_id: number;
}
