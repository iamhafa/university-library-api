import { DeleteResult } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EJOB_NAME } from '@/common/constants';
import { FineRepository } from './fine.repository';
import { CreateFineDto } from './dto/create-fine.dto';
import { UpdateFineDto } from './dto/update-fine.dto';
import { Fine } from './entities/fine.entity';
import { BookBorrowingService } from '../book-borrowing/book-borrowing.service';

@Injectable()
export class FineService {
  private readonly logger = new Logger(FineService.name);

  constructor(
    private readonly fineRepository: FineRepository,
    private readonly bookBorrowingService: BookBorrowingService,
  ) {}

  // tạo thẻ phạt với những hoạt động trả sách trễ hạn
  @Cron(CronExpression.EVERY_10_SECONDS, { name: EJOB_NAME.FINE })
  cronFineLateBookReturn() {
    this.logger.fatal('Cron excute every 10s');
  }

  findOne(id: number): Promise<Fine> {
    return this.fineRepository.findOne({ id });
  }

  findAll(): Promise<Fine[]> {
    return this.fineRepository.findAll();
  }

  createOne(createFineDto: CreateFineDto): Promise<Fine> {
    return this.fineRepository.createOne(createFineDto);
  }

  updateOne(id: number, updateFineDto: UpdateFineDto): Promise<Fine> {
    return this.fineRepository.findOneAndUpdate({ id }, updateFineDto);
  }

  deleteOne(id: number): Promise<DeleteResult> {
    return this.fineRepository.findOneAndDelete({ id });
  }
}
