import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@/libs/database/base.repository';
import { Rule } from './entities/rule.entity';

@Injectable()
export class RuleRepository extends BaseRepository<Rule> {
  protected readonly logger = new Logger(RuleRepository.name);

  constructor(@InjectRepository(Rule) private readonly ruleRepository: Repository<Rule>) {
    super(ruleRepository);
  }
}