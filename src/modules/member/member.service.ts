import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-customer.dto';
import { UpdateMemberDto } from './dto/update-customer.dto';
import { MemberRepository } from './member.repository';
import { Member } from './entities/member.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/pagination.dto';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  findOne(id: number): Promise<Member> {
    return this.memberRepository.findOneBy({ id });
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<Member[]>> {
    return this.memberRepository.findAll(paginationDto);
  }

  createOne(createMemberDto: CreateMemberDto): Promise<Member> {
    return this.memberRepository.createOne(createMemberDto);
  }

  updateOne(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    return this.memberRepository.updateOneBy({ id }, updateMemberDto);
  }

  deleteOne(id: number): Promise<Member> {
    return this.memberRepository.deleteOneBy({ id });
  }
}
