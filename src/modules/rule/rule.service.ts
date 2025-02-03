import { Injectable } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { RuleRepository } from './rule.repository';
import { Rule } from './entities/rule.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class RuleService {
  constructor(private readonly ruleRepository: RuleRepository) {}

  findOne(id: number): Promise<Rule> {
    return this.ruleRepository.findOne({ id });
  }

  findAll(): Promise<Rule[]> {
    return this.ruleRepository.findAll();
  }

  createOne(createRuleDto: CreateRuleDto): Promise<Rule> {
    return this.ruleRepository.createOne(createRuleDto);
  }

  updateOne(id: number, updateRuleDto: UpdateRuleDto): Promise<Rule> {
    return this.ruleRepository.findOneAndUpdate({ id }, updateRuleDto);
  }

  deleteOne(id: number): Promise<DeleteResult> {
    return this.ruleRepository.findOneAndDelete({ id });
  }
}
