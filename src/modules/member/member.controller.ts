import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, Query } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-customer.dto';
import { UpdateMemberDto } from './dto/update-customer.dto';
import { Member } from './entities/member.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';

@ApiTags('Quản lý thành viên (sinh viên)')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
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
