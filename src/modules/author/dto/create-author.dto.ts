import { BaseDto } from '@/libs/database/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAuthorDto extends BaseDto {
  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty({ default: null })
  @IsString()
  bio: string;
}
