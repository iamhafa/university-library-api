import { FINE_TICKET_PAYMENT_METHOD, FINE_TICKET_STATUS } from '@/common/constants/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreateFineTicketDto {
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @ApiProperty()
  book_borrowing_id: number;

  @IsEnum(FINE_TICKET_STATUS)
  @ApiProperty({ enum: FINE_TICKET_STATUS, default: FINE_TICKET_STATUS.UNPAID })
  status: FINE_TICKET_STATUS;

  @IsNumber()
  @ApiProperty()
  total_fine_amount: number;

  @ApiProperty({ enum: FINE_TICKET_PAYMENT_METHOD })
  @IsEnum(FINE_TICKET_PAYMENT_METHOD)
  @IsOptional()
  payment_method: FINE_TICKET_PAYMENT_METHOD;

  @ApiProperty({ default: null })
  @IsDateString()
  @IsOptional()
  payment_date: Date;
}
