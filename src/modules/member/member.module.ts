import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { MemberService } from './services/member.service';
import { MemberController } from './controllers/member.controller';
import { Member } from './entities/member.entity';
import { MemberRepository } from './repositories/member.repository';

@Module({
  imports: [DatabaseModule.forFeature([Member])],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
})
export class MemberModule {}
