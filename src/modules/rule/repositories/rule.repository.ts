import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Rule } from '../entities/rule.entity';
import { BaseRepository } from '@/libs/database/repositories/base.repository';

@Injectable()
export class RuleRepository extends BaseRepository<Rule> {
  constructor(protected readonly entityManager: EntityManager) {
    super(Rule, entityManager);
  }
}
