import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/libs/database/repositories/base.repository';
import { Rule } from './entities/rule.entity';

@Injectable()
export class RuleRepository extends BaseRepository<Rule> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Rule, entityManager);
  }
}
