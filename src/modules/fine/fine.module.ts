import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { FineService } from './fine.service';
import { FineController } from './fine.controller';
import { Fine } from './entities/fine.entity';
import { FineRepository } from './fine.repository';

@Module({
  imports: [DatabaseModule.forFeature([Fine])],
  controllers: [FineController],
  providers: [FineService, FineRepository],
})
export class FineModule {}
