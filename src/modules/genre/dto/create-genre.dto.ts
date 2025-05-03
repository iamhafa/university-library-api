import { BaseDto } from '@/libs/database/dto/base.dto';
import { IsString } from 'class-validator';

export class CreateGenreDto extends BaseDto {
  @IsString()
  name: string;
}
