import { Injectable } from '@nestjs/common';
import { FineTicketRepository } from '../repositories/fine-ticket.repository';
import { CreateFineTicketDto } from '../dto/create-fine-ticket.dto';
import { UpdateFineTicketDto } from '../dto/update-fine-ticket.dto';
import { FineTicket } from '../entities/fine-ticket.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';

@Injectable()
export class FineTicketService {
  constructor(private readonly fineTicketRepository: FineTicketRepository) {}

  findOne(id: number): Promise<FineTicket> {
    return this.fineTicketRepository.findOneById(id);
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<FineTicket[]>> {
    return this.fineTicketRepository.findAll({
      paginationDto,
      relations: {
        borrowing: {
          member: true,
        },
      },
    });
  }

  createOne(createFineTicketDto: CreateFineTicketDto): Promise<FineTicket> {
    return this.fineTicketRepository.createOne(createFineTicketDto);
  }

  updateOne(id: number, updateFineTicketDto: UpdateFineTicketDto): Promise<FineTicket> {
    return this.fineTicketRepository.updateOneById(id, updateFineTicketDto);
  }

  deleteOne(id: number): Promise<FineTicket> {
    return this.fineTicketRepository.deleteOneById(id);
  }
}
