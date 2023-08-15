/* eslint-disable */ 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('RCA-mis BACKEND API')
  .setDescription('The RCA-MIS BACKEND API description')
  .setVersion('1.0')
  .addTag('rcaBackend')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);

  // insert the roles in the database at the application starting
}
bootstrap();
