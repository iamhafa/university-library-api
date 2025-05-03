import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@/libs/database/repositories/base.repository';
import { Rule } from './entities/rule.entity';

@Injectable()
export class RuleRepository extends BaseRepository<Rule> {
  constructor(@InjectRepository(Rule) protected readonly ruleRepository: Repository<Rule>) {
    super(ruleRepository);
  }
}
