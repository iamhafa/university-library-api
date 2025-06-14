import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { TSentMessageInfo } from '@/common/constants/type';
import { HandleMailerError } from '@/common/decorators/handle-mailer-error.decorator';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(private readonly mailerService: MailerService) {}

  @HandleMailerError()
  async sendWelcomeMail(to: string, name: string): Promise<void> {
    const message: TSentMessageInfo = await this.mailerService.sendMail({
      to,
      subject: 'Welcome to our platform!',
      template: './welcome',
      context: { name },
    });

    if (message.accepted.includes(to)) {
      this.logger.log(`Send welcome email success to ${to}`);
    } else {
      this.logger.error(`Error when send welcome email to ${to}`);
    }
  }

  async sendFineTicketMail(to: string, name: string) {
    const message: TSentMessageInfo = await this.mailerService.sendMail({
      to,
      subject: 'Fine ticket for book overdue return!',
      template: './send-fine-ticket',
      context: { name },
    });

    if (message.accepted.includes(to)) {
      this.logger.log(`Send fine ticket notification success to ${to}`, this.sendFineTicketMail.name);
    } else {
      this.logger.error(`Error when send fine ticket notification to ${to}`);
    }
  }
}
