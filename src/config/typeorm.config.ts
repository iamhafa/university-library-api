import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmFactoryConfig implements TypeOrmOptionsFactory {
  private readonly logger = new Logger();
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const database: string = this.configService.get<string>('DB_DATABASE_LOCAL');
    this.logger.verbose(`Connected to database [${database}]`);

    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST_LOCAL'),
      username: this.configService.get<string>('DB_USERNAME_LOCAL'),
      password: this.configService.get<string>('DB_PASSWORD_LOCAL'),
      database: database,
      port: this.configService.get<number>('DB_PORT_LOCAL'),
      autoLoadEntities: true,
      // disable when production
      synchronize: true,
    };
  }
}
