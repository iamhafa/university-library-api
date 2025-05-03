import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MEMBER_TYPE } from '@/common/constants/enum';
import { BaseDto } from '@/libs/database/dto/base.dto';

export class CreateMemberDto extends BaseDto {
  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsString()
  @IsPhoneNumber('VN')
  phone_number: string;

  @ApiProperty({
    enum: MEMBER_TYPE,
    default: MEMBER_TYPE.UNDERGRADUATE_STUDENT,
  })
  member_type: string;

  @ApiProperty({ nullable: true })
  @IsString()
  address: string;

  @ApiProperty()
  enrollment_date: Date;
}
