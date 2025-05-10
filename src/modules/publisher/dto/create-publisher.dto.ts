import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePublisherDto {
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
