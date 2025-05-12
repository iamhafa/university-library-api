import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { PublisherService } from './services/publisher.service';
import { PublisherController } from './controllers/publisher.controller';
import { Publisher } from './entities/publisher.entity';
import { PublisherRepository } from './repositories/publisher.repository';

@Module({
  imports: [DatabaseModule.forFeature([Publisher])],
  controllers: [PublisherController],
  providers: [PublisherService, PublisherRepository],
})
export class PublisherModule {}
