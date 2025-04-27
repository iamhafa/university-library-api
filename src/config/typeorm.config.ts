import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  private readonly logger = new Logger(TypeOrmConfig.name);

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const database: string = this.configService.get<string>('DB_DATABASE');
    const host: string = this.configService.get<string>('DB_HOST');
    const port: number = this.configService.get<number>('DB_PORT');
    const envMode: string = this.configService.get<string>('APP_ENV');
    const isProduction: boolean = envMode === 'production';

    isProduction && this.logger.verbose('Running on mode PRODUCTION');
    this.logger.verbose(`Connecting to database [${database}] on host [${host}] via port [${port}]...`);

    return {
      type: 'postgres',
      host: host,
      database: database,
      port: port,
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      autoLoadEntities: true,
      synchronize: isProduction ? false : true, // disable when production
      logging: ['schema'],
    };
  }
}
