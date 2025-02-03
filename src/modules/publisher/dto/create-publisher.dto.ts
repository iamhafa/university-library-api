import { BaseDto } from '@/libs/database/base.dto';
import { IsNumber, IsString } from 'class-validator';

export class CreatePublisherDto extends BaseDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsNumber()
  contact_number: number;
}
