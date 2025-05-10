import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Member } from '../entities/member.entity';
import { BaseRepository } from '@/libs/database/repositories/base.repository';

@Injectable()
export class MemberRepository extends BaseRepository<Member> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Member, entityManager);
  }
}
