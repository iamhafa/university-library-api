import { BaseDto } from '@/libs/database/base.dto';
import { IsString } from 'class-validator';

export class CreatePublisherDto extends BaseDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  contact_number: string;
}
