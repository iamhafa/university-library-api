import { BaseDto } from '@/libs/database/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGenreDto extends BaseDto {
  @ApiProperty()
  @IsString()
  name: string;
}
