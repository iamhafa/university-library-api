import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MEMBER_TYPE } from '@/common/constants/enum';

export class CreateMemberDto {
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
