import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { swaggerConfig } from '@/config/swagger.config';
import { HttpExceptionFilter } from '@/core/filters/http-exception.filter';
import { ResponseInterceptor } from '@/core/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const appPort: number = configService.get<number>('APP_PORT', 4000);

  // Enable CORS
  app.enableCors();
  // Enable for validation (when use DTO)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // bỏ qua validate & không accept giá trị nhận được từ request trong DTO
      forbidNonWhitelisted: true,
    }),
  );
  // Interceptor to format date in each response
  app.useGlobalInterceptors(new ResponseInterceptor());
  // Filter to format error response
  app.useGlobalFilters(new HttpExceptionFilter());
  // Prefix
  app.setGlobalPrefix(configService.get<string>('APP_PREFIX_API'));
  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: configService.get<string>('APP_VERSION_API'), // default is "v1"
  });

  const documentFactory = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(configService.get<string>('APP_SWAGGER_PATH'), app, documentFactory);

  await app.listen(appPort, () => {
    const logger: Logger = new Logger('Bootstrap');
    logger.verbose(`The app running on [http://localhost:${appPort}]`);
  });
}
bootstrap();
