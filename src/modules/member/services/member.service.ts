import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from '../dto/create-member.dto';
import { UpdateMemberDto } from '../dto/update-member.dto';
import { MemberRepository } from '../repositories/member.repository';
import { Member } from '../entities/member.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  findOne(id: number): Promise<Member> {
    return this.memberRepository.findOneById(id);
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<Member[]>> {
    return this.memberRepository.findAll({ paginationDto });
  }

  createOne(createMemberDto: CreateMemberDto): Promise<Member> {
    return this.memberRepository.createOne(createMemberDto);
  }

  updateOne(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    return this.memberRepository.updateOneById(id, updateMemberDto);
  }

  deleteOne(id: number): Promise<Member> {
    return this.memberRepository.deleteOneById(id);
  }
}
