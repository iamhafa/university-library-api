import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    nullable: true,
    default: null,
  })
  @IsString()
  @IsOptional()
  bio: string;
}
