import { BaseDto } from '@/libs/database/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookDto extends BaseDto {
  @ApiProperty()
  @IsString()
  title: string;

  // FK
  @ApiProperty({ type: [Number], example: [1, 2, 3, 4, 5] })
  @IsOptional()
  @Type(() => Number)
  // @IsArray({ each: true })
  author_ids: number[];

  @ApiProperty()
  @IsString()
  ISBN: string;

  @ApiProperty()
  @IsInt()
  price: number;

  @ApiProperty()
  @IsNumber()
  stock: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
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
  @IsInt()
  genre_id: number;

  @ApiProperty()
  @IsInt()
  publisher_id: number;
}
