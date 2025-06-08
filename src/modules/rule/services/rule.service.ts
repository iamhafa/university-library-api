import { Injectable } from '@nestjs/common';
import { CreateRuleDto } from '../dto/create-rule.dto';
import { UpdateRuleDto } from '../dto/update-rule.dto';
import { RuleRepository } from '../repositories/rule.repository';
import { Rule } from '../entities/rule.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';

@Injectable()
export class RuleService {
  constructor(private readonly ruleRepository: RuleRepository) {}

  findOne(id: number): Promise<Rule> {
    return this.ruleRepository.findOneById(id);
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<Rule[]>> {
    return this.ruleRepository.findAll({ paginationDto });
  }

  createOne(createRuleDto: CreateRuleDto): Promise<Rule> {
    return this.ruleRepository.createOne(createRuleDto);
  }

  updateOne(id: number, updateRuleDto: UpdateRuleDto): Promise<Rule> {
    return this.ruleRepository.updateOneById(id, updateRuleDto);
  }

  deleteOne(id: number): Promise<Rule> {
    return this.ruleRepository.deleteOneById(id);
  }
}
