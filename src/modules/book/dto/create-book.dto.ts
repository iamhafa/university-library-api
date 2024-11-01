import { BaseDto } from '@/libs/database/base.dto';
import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto extends BaseDto {
  @IsString()
  title: string;

  // FK
  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @IsString()
  ISBN: string;

  @IsDecimal()
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  publishedDate: string;

  @IsString()
  description: string;
}
