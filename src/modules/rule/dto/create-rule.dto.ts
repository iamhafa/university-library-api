import { MEMBER_TYPE } from '@/common/constants/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';

export class CreateRuleDto {
  @ApiProperty({ enum: MEMBER_TYPE, default: MEMBER_TYPE.UNDERGRADUATE_STUDENT })
  @IsEnum(MEMBER_TYPE)
  member_type: MEMBER_TYPE;

  @ApiProperty()
  @IsNumber()
  max_borrowed_book: number;

  @ApiProperty()
  @IsNumber()
  max_borrowed_day: number;
}
