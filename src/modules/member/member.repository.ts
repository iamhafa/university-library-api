import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/libs/database/base.repository';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberRepository extends BaseRepository<Member> {
  constructor(@InjectRepository(Member) protected readonly customerRepository: Repository<Member>) {
    super(customerRepository);
  }
}
