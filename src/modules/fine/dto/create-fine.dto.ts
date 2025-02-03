import { BORROWING_STATUS } from '@/common/constants/enum';
import { BaseDto } from '@/libs/database/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';

export class CreateFineDto extends BaseDto {
  @IsNumber()
  @ApiProperty()
  amount_money: number;

  @IsEnum(BORROWING_STATUS)
  @ApiProperty({ enum: BORROWING_STATUS, default: BORROWING_STATUS.OVERDUE })
  return_status: BORROWING_STATUS;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @ApiProperty()
  book_borrowing_id: number;
}
