import { join } from 'path';
import { google } from 'googleapis';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { GetAccessTokenResponse, OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client';

@Injectable()
export class MailFactoryConfig implements MailerOptionsFactory {
  private readonly logger = new Logger(MailFactoryConfig.name);
  constructor(private readonly configService: ConfigService) {}

  async createMailerOptions(): Promise<MailerOptions> {
    const oAuth2Client: OAuth2Client = new google.auth.OAuth2(
      this.configService.get<string>('MAIL_CLIENT_ID'),
      this.configService.get<string>('MAIL_CLIENT_SECRET'),
      this.configService.get<string>('MAIL_REDIRECT_URI'),
    );
    oAuth2Client.setCredentials({ refresh_token: this.configService.get<string>('MAIL_REFRESH_TOKEN') });

    const accessToken: GetAccessTokenResponse = await oAuth2Client.getAccessToken();
    this.logger.verbose('Successful connect to send mail service via Gmail (OAuth2)');

    return {
      transport: {
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: this.configService.get<string>('MAIL_USER_TEST'),
          clientId: this.configService.get<string>('MAIL_CLIENT_ID'),
          clientSecret: this.configService.get<string>('MAIL_CLIENT_SECRET'),
          refreshToken: this.configService.get<string>('MAIL_REFRESH_TOKEN'),
          accessToken: accessToken as string,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, '..', 'mail', 'templates'), // Resolves correctly to /mail/templates
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
