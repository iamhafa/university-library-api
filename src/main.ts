import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from '@/config/swagger.config';
import { FormatDateResponseInterceptor } from '@/core/interceptors/format-date-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Enable for validation (when use DTO)
  app.useGlobalPipes(
    new ValidationPipe({
      // tranform data when @Tranform in @Entity
      transform: true,
    }),
  );
  // Interceptor to format date in each response
  app.useGlobalInterceptors(new FormatDateResponseInterceptor());

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory);

  app.setGlobalPrefix('api');
  await app.listen(4000);
}
bootstrap();
