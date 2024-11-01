import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PunishService } from './punish.service';
import { CreatePunishDto } from './dto/create-punish.dto';
import { UpdatePunishDto } from './dto/update-punish.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Quản lý phạt khi sinh viên trễ trả sách')
@Controller('punish')
export class PunishController {
  constructor(private readonly punishService: PunishService) {}

  @Post()
  create(@Body() createPunishDto: CreatePunishDto) {
    return this.punishService.create(createPunishDto);
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
  update(@Param('id') id: string, @Body() updatePunishDto: UpdatePunishDto) {
    return this.punishService.update(+id, updatePunishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.punishService.remove(+id);
  }
}
