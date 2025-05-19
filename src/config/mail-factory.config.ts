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
    const clientId: string = this.configService.get<string>('OAUTH_MAIL_CLIENT_ID');
    const clientScret: string = this.configService.get<string>('OAUTH_MAIL_CLIENT_SECRET');
    const refreshToken: string = this.configService.get<string>('OAUTH_MAIL_REFRESH_TOKEN');
    const redirectUri: string = this.configService.get<string>('OAUTH_MAIL_REDIRECT_URI');
    const userTest: string = this.configService.get<string>('OAUTH_MAIL_USER_TEST', 'sangkenjii@gmail.com');

    const oAuth2Client: OAuth2Client = new google.auth.OAuth2(clientId, clientScret, redirectUri);
    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    const accessToken: GetAccessTokenResponse = await oAuth2Client.getAccessToken();
    this.logger.verbose('Connected to send mail service via Gmail (OAuth2) successfully.');
    this.logger.debug(accessToken.res);

    return {
      transport: {
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: userTest,
          clientId: clientId,
          clientSecret: clientScret,
          refreshToken: refreshToken,
          accessToken: accessToken.token,
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
