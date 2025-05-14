import { BORROWING_STATUS } from '@/common/constants/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreateBookBorrowingDto {
  @ApiProperty({ default: 1 })
  @IsNumber()
  member_id: number;

  @ApiProperty({ enum: BORROWING_STATUS })
  @IsEnum(BORROWING_STATUS)
  status: BORROWING_STATUS;

  @ApiProperty({ default: '2025-05-01' })
  @IsDateString()
  borrowing_date: Date;

  @ApiProperty({ default: '2025-05-12' })
  @IsDateString()
  due_date: Date;

  @ApiProperty({ default: null, nullable: true })
  @IsDateString()
  @IsOptional()
  returned_date: Date;
}
