import { BORROWING_STATUS } from '@/common/constants/enum';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreateBorrowingDto {
  @ApiProperty({ default: 1 })
  @IsNumber()
  member_id: number;

  @ApiProperty({ enum: BORROWING_STATUS })
  @IsEnum(BORROWING_STATUS)
  status: BORROWING_STATUS;

  @ApiProperty({ default: '2025-05-01' })
  @IsDateString()
  @Transform(({ value }) => (value === '' ? null : value))
  borrowing_date: Date;

  @ApiProperty({ default: '2025-05-12' })
  @IsDateString()
  @Transform(({ value }) => (value === '' ? null : value))
  due_date: Date;

  @ApiProperty({ default: null, nullable: true })
  @IsDateString()
  @Transform(({ value }) => (value === '' ? null : value))
  returned_date: Date;

  @ApiHideProperty()
  created_by: string;

  @ApiHideProperty()
  updated_by: string;
}
