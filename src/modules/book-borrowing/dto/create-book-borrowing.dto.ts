import { BORROWING_STATUS } from '@/common/constants/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber } from 'class-validator';

export class CreateBookBorrowingDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  member_id: number;

  @IsEnum(BORROWING_STATUS)
  @ApiProperty({ enum: BORROWING_STATUS })
  status: BORROWING_STATUS;

  @IsDateString()
  @ApiProperty({ example: '2025-05-01' })
  borrowing_date: Date;

  @IsDateString()
  @ApiProperty({ example: '2025-05-12' })
  due_date: Date;

  @IsDateString()
  @ApiProperty({ default: null, nullable: true })
  returned_date: Date;
}
