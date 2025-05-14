import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, Query } from '@nestjs/common';
import { MemberService } from '../services/member.service';
import { CreateMemberDto } from '../dto/create-member.dto';
import { UpdateMemberDto } from '../dto/update-member.dto';
import { Member } from '../entities/member.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';
import { ApiPaginationQuery } from '@/decorators/api-pagination-query.decorator';

@ApiTags('Thành viên')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @ApiPaginationQuery()
  getAll(@Query() paginationDto: PaginationDto): Promise<TPagination<Member[]>> {
    return this.memberService.findAll(paginationDto);
  }

  @Post()
  createOne(@Body() createMemberDto: CreateMemberDto): Promise<Member> {
    return this.memberService.createOne(createMemberDto);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Member> {
    return this.memberService.findOne(id);
  }

  @Put(':id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() updateMemberDto: UpdateMemberDto): Promise<Member> {
    return this.memberService.updateOne(id, updateMemberDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.memberService.deleteOne(id);
  }
}
