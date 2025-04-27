import { DeleteResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { PublisherRepository } from './publisher.repository';
import { Publisher } from './entities/publisher.entity';
import { TPagination } from '@/common/constants/type';
import { PaginationDto } from '@/libs/database/pagination.dto';

@Injectable()
export class PublisherService {
  constructor(private readonly publisherRepository: PublisherRepository) {}

  findOne(id: number): Promise<Publisher> {
    return this.publisherRepository.findOneBy({ id });
  }

  findAll(paginationDto: PaginationDto): Promise<TPagination<Publisher> | Publisher[]> {
    return this.publisherRepository.findAll(paginationDto);
  }

  createOne(createPublisherDto: CreatePublisherDto): Promise<Publisher> {
    return this.publisherRepository.createOne(createPublisherDto);
  }

  updateOne(id: number, updatePublisherDto: UpdatePublisherDto): Promise<Publisher> {
    return this.publisherRepository.updateOne({ id }, updatePublisherDto);
  }

  deleteOne(id: number): Promise<Publisher> {
    return this.publisherRepository.deleteOne({ id });
  }
}
