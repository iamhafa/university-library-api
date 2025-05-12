import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, Query } from '@nestjs/common';
import { FineService } from '../services/fine.service';
import { CreateFineDto } from '../dto/create-fine.dto';
import { UpdateFineDto } from '../dto/update-fine.dto';
import { Fine } from '../entities/fine.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';
import { ApiPaginationQuery } from '@/decorators/api-pagination-query.decorator';

@ApiTags('Quản lý Phạt khi sinh viên trễ trả sách')
@Controller('punish')
export class FineController {
  constructor(private readonly fineService: FineService) {}

  @Get()
  @ApiPaginationQuery()
  getAll(@Query() paginationDto: PaginationDto): Promise<TPagination<Fine[]>> {
    return this.fineService.findAll(paginationDto);
  }

  @Post()
  createOne(@Body() createFineDto: CreateFineDto): Promise<Fine> {
    return this.fineService.createOne(createFineDto);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Fine> {
    return this.fineService.findOne(id);
  }

  @Put(':id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() updateFineDto: UpdateFineDto): Promise<Fine> {
    return this.fineService.updateOne(id, updateFineDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.fineService.deleteOne(id);
  }
}
