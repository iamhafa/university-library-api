import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-customer.dto';
import { UpdateMemberDto } from './dto/update-customer.dto';
import { MemberRepository } from './member.repository';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  create(createMemberDto: CreateMemberDto): Promise<Member> {
    return this.memberRepository.createOne(createMemberDto);
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
