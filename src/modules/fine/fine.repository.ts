import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@/libs/database/repositories/base.repository';
import { Fine } from './entities/fine.entity';

@Injectable()
export class FineRepository extends BaseRepository<Fine> {
  constructor(@InjectRepository(Fine) protected readonly punishRepository: Repository<Fine>) {
    super(punishRepository);
  }
}
