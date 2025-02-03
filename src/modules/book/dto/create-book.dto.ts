import { BaseDto } from '@/libs/database/base.dto';
import { IsDate, IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto extends BaseDto {
  @IsString()
  title: string;

  // FK
  @IsNumber()
  @IsNotEmpty()
  author_id: number;

  @IsString()
  ISBN: string;

  @IsDecimal()
  price: number;

  @IsNumber()
  stock: number;

  @IsDate()
  publish_date: Date;

  @IsString()
  description: string;

  @IsNumber()
  total_page: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  genre_id: number;

  @IsNumber()
  publisher_id: number;
}
