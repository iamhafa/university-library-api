import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateFineDto } from './dto/create-fine.dto';
import { UpdateFineDto } from './dto/update-fine.dto';

@Injectable()
export class FineService {
  private readonly logger = new Logger(FineService.name);

  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'punish' })
  cronFine() {
    this.logger.log('Cron excute every 10s');
  }

  create(createFineDto: CreateFineDto) {
    return 'This action adds a new punish';
  }

  findAll() {
    return `This action returns all punish`;
  }

  findOne(id: number) {
    return `This action returns a #${id} punish`;
  }

  update(id: number, updateFineDto: UpdateFineDto) {
    return `This action updates a #${id} punish`;
  }

  remove(id: number) {
    return `This action removes a #${id} punish`;
  }
}
