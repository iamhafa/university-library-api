import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { PunishService } from './punish.service';
import { PunishController } from './punish.controller';
import { Punish } from './entities/punish.entity';
import { PunishRepository } from './punish.repository';

@Module({
  imports: [DatabaseModule.forFeature([Punish])],
  controllers: [PunishController],
  providers: [PunishService, PunishRepository],
})
export class PunishModule {}
