import { parse } from 'date-fns';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  title: string;

  // FK
  @ApiProperty({ type: [Number], example: [1, 2, 3, 4, 5] })
  @IsOptional()
  @Type(() => Number)
  // @IsArray({ each: true })
  author_ids: number[];

  // @ApiProperty()
  // @IsNumber()
  // author_id: number;

  @ApiProperty()
  @IsString()
  ISBN: string;

  @ApiProperty({ default: 'https://covers.openlibrary.org/b/id/10592539-L.jpg' })
  image_url: string;

  @ApiProperty()
  @IsInt()
  price: number;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return parse(value, 'dd-MM-yyyy', new Date());
    }
    return value;
  })
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
