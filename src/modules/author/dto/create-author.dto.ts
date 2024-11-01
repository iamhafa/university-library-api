import { BaseDto } from '@/libs/database/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto extends BaseDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ default: null })
  bio: string;
}
