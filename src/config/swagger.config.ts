import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Universitry Library API')
  .setDescription('Documentation API')
  .setVersion('1.0')
  .setContact('Nguyễn Cao Sang', 'https://facebook.com/iamhafa', 'iamhafaa@gmail.com')
  .addBearerAuth({ type: 'http', bearerFormat: 'Bearer' })
  .build();
