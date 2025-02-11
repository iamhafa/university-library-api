import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, Query } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { Publisher } from './entities/publisher.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/pagination.dto';

@ApiTags('Quản lý nhà xuất bản')
@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Get()
  getAll(@Query() paginationDto: PaginationDto): Promise<TPagination<Publisher> | Publisher[]> {
    return this.publisherService.findAll(paginationDto);
  }

  @Post()
  createOne(@Body() createPublisherDto: CreatePublisherDto): Promise<Publisher> {
    return this.publisherService.createOne(createPublisherDto);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Publisher> {
    return this.publisherService.findOne(id);
  }

  @Put(':id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() updatePublisherDto: UpdatePublisherDto): Promise<Publisher> {
    return this.publisherService.updateOne(id, updatePublisherDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.publisherService.deleteOne(id);
  }
}
