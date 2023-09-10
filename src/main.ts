/* eslint-disable */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: '*',
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('RCA-mis BACKEND API')
    .setDescription(
      'This is the rca information management application to ease different operations such reports generation , students , teachers and courses management',
    )
    .setVersion('1.0')
    .addTag('rcaBackend')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);

  // insert the roles in the database at the application starting
}
bootstrap();
