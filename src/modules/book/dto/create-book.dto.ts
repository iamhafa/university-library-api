import { BaseDto } from '@/libs/database/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto extends BaseDto {
  @ApiProperty()
  @IsString()
  title: string;

  // FK
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  author_id: number;

  @ApiProperty()
  @IsString()
  ISBN: string;

  @ApiProperty()
  @IsDecimal()
  price: number;

  @ApiProperty()
  @IsNumber()
  stock: number;

  @IsDate()
  publish_date: Date;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  total_page: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  genre_id: number;

  @ApiProperty()
  @IsNumber()
  publisher_id: number;
}
