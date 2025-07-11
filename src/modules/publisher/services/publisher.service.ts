import { Injectable } from '@nestjs/common';
import { CreatePublisherDto } from '../dto/create-publisher.dto';
import { UpdatePublisherDto } from '../dto/update-publisher.dto';
import { PublisherRepository } from '../repositories/publisher.repository';
import { Publisher } from '../entities/publisher.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/dto/pagination.dto';

@Injectable()
export class PublisherService {
  constructor(private readonly publisherRepository: PublisherRepository) {}

  findOne(id: number): Promise<Publisher> {
    return this.publisherRepository.findOneById(id);
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<Publisher[]>> {
    return this.publisherRepository.findAll({ paginationDto });
  }

  createOne(createPublisherDto: CreatePublisherDto): Promise<Publisher> {
    return this.publisherRepository.createOne(createPublisherDto);
  }

  updateOne(id: number, updatePublisherDto: UpdatePublisherDto): Promise<Publisher> {
    return this.publisherRepository.updateOneById(id, updatePublisherDto);
  }

  deleteOne(id: number): Promise<Publisher> {
    return this.publisherRepository.deleteOneById(id);
  }
}
