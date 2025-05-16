import { FINE_TICKET_STATUS } from '@/common/constants/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';

export class CreateFineTicketDto {
  @IsNumber()
  @ApiProperty()
  total_fine_amount: number;

  @IsEnum(FINE_TICKET_STATUS)
  @ApiProperty({ enum: FINE_TICKET_STATUS, default: FINE_TICKET_STATUS.UNPAID })
  status: FINE_TICKET_STATUS;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @ApiProperty()
  book_borrowing_id: number;
}
