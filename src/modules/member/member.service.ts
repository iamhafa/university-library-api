import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-customer.dto';
import { UpdateMemberDto } from './dto/update-customer.dto';
import { MemberRepository } from './member.repository';
import { Member } from './entities/member.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  findOne(id: number): Promise<Member> {
    return this.memberRepository.findOne({ id });
  }

  findAll(): Promise<Member[]> {
    return this.memberRepository.findAll();
  }

  createOne(createMemberDto: CreateMemberDto): Promise<Member> {
    return this.memberRepository.createOne(createMemberDto);
  }

  updateOne(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    return this.memberRepository.findOneAndUpdate({ id }, updateMemberDto);
  }

  deleteOne(id: number): Promise<DeleteResult> {
    return this.memberRepository.findOneAndDelete({ id });
  }
}
