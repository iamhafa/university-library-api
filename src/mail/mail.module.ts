import { MailFactoryConfig } from '@/config/mail-factory.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  imports: [MailerModule.forRootAsync({ useClass: MailFactoryConfig })],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
