import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder().setTitle('Book store API').setVersion('1.0').build();
