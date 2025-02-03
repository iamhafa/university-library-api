import { BaseDto } from '@/libs/database/base.dto';
import { IsNumber } from 'class-validator';

export class CreateAuthorBookItemsDto extends BaseDto {
  @IsNumber()
  author_id: number;

  @IsNumber()
  book_id: number;
}
