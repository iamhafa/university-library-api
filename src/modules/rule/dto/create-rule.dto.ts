import { MEMBER_TYPE } from '@/common/constants/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';

export class CreateRuleDto {
  @IsEnum(MEMBER_TYPE)
  @ApiProperty({ enum: MEMBER_TYPE })
  member_type: MEMBER_TYPE;

  @IsNumber()
  @ApiProperty()
  max_borrowed_book: number;

  @IsNumber()
  @ApiProperty()
  max_borrowed_day: number;
}
