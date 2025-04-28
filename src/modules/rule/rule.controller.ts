import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, Query } from '@nestjs/common';
import { RuleService } from './rule.service';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { Rule } from './entities/rule.entity';
import { PaginationDto } from '@/libs/database/pagination.dto';
import { TPagination } from '@/common/constants/type';

@ApiTags('Quản lý quy định mượn sách')
@Controller('rule')
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Get()
  getAll(@Query() paginationDto: PaginationDto): Promise<TPagination<Rule[]>> {
    return this.ruleService.findAll(paginationDto);
  }

  @Post()
  createOne(@Body() createRuleDto: CreateRuleDto): Promise<Rule> {
    return this.ruleService.createOne(createRuleDto);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Rule> {
    return this.ruleService.findOne(id);
  }

  @Put(':id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() updateRuleDto: UpdateRuleDto): Promise<Rule> {
    return this.ruleService.updateOne(id, updateRuleDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.ruleService.deleteOne(id);
  }
}
