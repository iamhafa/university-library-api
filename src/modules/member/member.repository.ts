import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { BaseRepository } from '@/libs/database/repositories/base.repository';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberRepository extends BaseRepository<Member> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Member, entityManager);
  }
}
