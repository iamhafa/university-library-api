import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FineService } from './fine.service';
import { CreateFineDto } from './dto/create-fine.dto';
import { UpdateFineDto } from './dto/update-fine.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Quản lý phạt khi sinh viên trễ trả sách')
@Controller('punish')
export class FineController {
  constructor(private readonly punishService: FineService) {}

  @Post()
  create(@Body() createFineDto: CreateFineDto) {
    return this.punishService.create(createFineDto);
  }

  @Get()
  findAll() {
    return this.punishService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.punishService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFineDto: UpdateFineDto) {
    return this.punishService.update(+id, updateFineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.punishService.remove(+id);
  }
}
