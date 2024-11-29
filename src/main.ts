import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { swaggerConfig } from '@/config/swagger.config';
import { FormatDateResponseInterceptor } from '@/core/interceptors/format-date-response.interceptor';
import { HttpExceptionFilter } from '@/core/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  app.enableCors();

  // Enable for validation (when use DTO)
  app.useGlobalPipes(new ValidationPipe());
  // Interceptor to format date in each response
  app.useGlobalInterceptors(new FormatDateResponseInterceptor());
  // Filter to format error response
  app.useGlobalFilters(new HttpExceptionFilter());
  // Prefix
  app.setGlobalPrefix(configService.get<string>('APP_PREFIX_API'));

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(configService.get<string>('APP_SWAGGER_PATH'), app, documentFactory);

  await app.listen(process.env.APP_PORT, () => {
    const logger: Logger = new Logger('Bootstrap');
    logger.verbose(`The app running on http://localhost:${configService.get<string>('APP_PORT')}`);
  });
}
bootstrap();
