import { DeleteResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { RuleRepository } from './rule.repository';
import { Rule } from './entities/rule.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/pagination.dto';

@Injectable()
export class RuleService {
  constructor(private readonly ruleRepository: RuleRepository) {}

  findOne(id: number): Promise<Rule> {
    return this.ruleRepository.findOneBy({ id });
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<Rule> | Rule[]> {
    return this.ruleRepository.findAll(paginationDto);
  }

  createOne(createRuleDto: CreateRuleDto): Promise<Rule> {
    return this.ruleRepository.createOne(createRuleDto);
  }

  updateOne(id: number, updateRuleDto: UpdateRuleDto): Promise<Rule> {
    return this.ruleRepository.updateOne({ id }, updateRuleDto);
  }

  deleteOne(id: number): Promise<Rule> {
    return this.ruleRepository.deleteOne({ id });
  }
}
