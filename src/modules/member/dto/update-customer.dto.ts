import { PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-customer.dto';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {}
