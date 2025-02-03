import { MEMBER_TYPE } from '@/common/constants/enum';
import { BaseDto } from '@/libs/database/base.dto';
import { IsEnum, IsNumber } from 'class-validator';

export class CreateRuleDto extends BaseDto {
  @IsEnum(MEMBER_TYPE)
  member_type: MEMBER_TYPE;

  @IsNumber()
  max_borrowed_book: number;

  @IsNumber()
  max_borrowed_day: number;
}
