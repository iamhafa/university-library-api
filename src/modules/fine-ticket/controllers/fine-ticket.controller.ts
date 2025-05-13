import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, Query } from '@nestjs/common';
import { FineTicketService } from '../services/fine-ticket.service';
import { CreateFineTicketDto } from '../dto/create-fine-ticket.dto';
import { UpdateFineTicketDto } from '../dto/update-fine-ticket.dto';
import { FineTicket } from '../entities/fine-ticket.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';
import { ApiPaginationQuery } from '@/decorators/api-pagination-query.decorator';

@ApiTags('Vé phạt')
@Controller('fine-ticket')
export class FineTicketController {
  constructor(private readonly fineService: FineTicketService) {}

  @Get()
  @ApiPaginationQuery()
  getAll(@Query() paginationDto: PaginationDto): Promise<TPagination<FineTicket[]>> {
    return this.fineService.findAll(paginationDto);
  }

  @Post()
  createOne(@Body() createFineTicketDto: CreateFineTicketDto): Promise<FineTicket> {
    return this.fineService.createOne(createFineTicketDto);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<FineTicket> {
    return this.fineService.findOne(id);
  }

  @Put(':id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() updateFineTicketDto: UpdateFineTicketDto): Promise<FineTicket> {
    return this.fineService.updateOne(id, updateFineTicketDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.fineService.deleteOne(id);
  }
}
