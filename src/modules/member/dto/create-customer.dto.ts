import { MEMBER_TYPE } from '@/common/constants';
import { BaseDto } from '@/libs/database/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

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
