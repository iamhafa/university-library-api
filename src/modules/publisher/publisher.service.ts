import { DeleteResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { PublisherRepository } from './publisher.repository';
import { Publisher } from './entities/publisher.entity';

@Injectable()
export class PublisherService {
  constructor(private readonly publisherRepository: PublisherRepository) {}

  findOne(id: number): Promise<Publisher> {
    return this.publisherRepository.findOne({ id });
  }

  findAll(): Promise<Publisher[]> {
    return this.publisherRepository.findAll();
  }

  createOne(createPublisherDto: CreatePublisherDto): Promise<Publisher> {
    return this.publisherRepository.createOne(createPublisherDto);
  }

  updateOne(id: number, updatePublisherDto: UpdatePublisherDto): Promise<Publisher> {
    return this.publisherRepository.findOneAndUpdate({ id }, updatePublisherDto);
  }

  deleteOne(id: number): Promise<DeleteResult> {
    return this.publisherRepository.findOneAndDelete({ id });
  }
}
