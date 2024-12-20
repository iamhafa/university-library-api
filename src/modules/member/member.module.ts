import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/libs/database/database.module';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { Member } from './entities/member.entity';
import { MemberRepository } from './member.repository';

@Module({
  imports: [DatabaseModule.forFeature([Member])],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
})
export class MemberModule {}
