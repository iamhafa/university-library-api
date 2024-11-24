import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@/libs/database/base.repository';
import { Fine } from './entities/fine.entity';

@Injectable()
export class FineRepository extends BaseRepository<Fine> {
  protected readonly logger = new Logger(FineRepository.name);

  constructor(@InjectRepository(Fine) private readonly punishRepository: Repository<Fine>) {
    super(punishRepository);
  }
}
