import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { FineService } from './fine.service';
import { CreateFineDto } from './dto/create-fine.dto';
import { UpdateFineDto } from './dto/update-fine.dto';
import { Fine } from './entities/fine.entity';

@ApiTags('Quản lý phạt khi sinh viên trễ trả sách')
@Controller('punish')
export class FineController {
  constructor(private readonly fineService: FineService) {}

  @Get()
  getAll(): Promise<Fine[]> {
    return this.fineService.findAll();
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
