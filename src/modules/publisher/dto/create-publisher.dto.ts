import { BaseDto } from '@/libs/database/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePublisherDto extends BaseDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ nullable: true, default: null })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({ nullable: true, default: null })
  @IsOptional()
  @IsString()
  contact_number: string;
}
