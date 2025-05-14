import { IsDateString, IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MEMBER_TYPE } from '@/common/constants/enum';

export class CreateMemberDto {
  @ApiProperty({ default: 'Nguyen Van' })
  @IsString()
  first_name: string;

  @ApiProperty({ default: 'A' })
  @IsString()
  last_name: string;

  @ApiProperty({ default: 'nguyenvana@student.humg.edu.vn' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: '12345' })
  @IsString()
  password: string;

  @ApiProperty({ default: '+84366287444' })
  @IsPhoneNumber('VN')
  phone_number: string;

  @ApiProperty({
    enum: MEMBER_TYPE,
    default: MEMBER_TYPE.UNDERGRADUATE_STUDENT,
  })
  member_type: string;

  @ApiProperty({ default: 'Ha Noi' })
  @IsString()
  address: string;

  @ApiProperty({ default: '2025-05-05' })
  @IsDateString()
  enrollment_date: Date;
}
