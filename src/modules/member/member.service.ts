import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-customer.dto';
import { UpdateMemberDto } from './dto/update-customer.dto';

@Injectable()
export class MemberService {
  create(createMemberDto: CreateMemberDto) {
    return 'This action adds a new customer';
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
