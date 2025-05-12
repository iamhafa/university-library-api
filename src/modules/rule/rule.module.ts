import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { RuleService } from './services/rule.service';
import { RuleController } from './controllers/rule.controller';
import { Rule } from './entities/rule.entity';
import { RuleRepository } from './repositories/rule.repository';

@Module({
  imports: [DatabaseModule.forFeature([Rule])],
  controllers: [RuleController],
  providers: [RuleService, RuleRepository],
})
export class RuleModule {}
