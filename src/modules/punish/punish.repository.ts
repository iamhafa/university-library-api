import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@/libs/database/base.repository';
import { Punish } from './entities/punish.entity';

@Injectable()
export class PunishRepository extends BaseRepository<Punish> {
  protected readonly logger = new Logger(PunishRepository.name);

  constructor(@InjectRepository(Punish) private readonly punishRepository: Repository<Punish>) {
    super(punishRepository);
  }
}
