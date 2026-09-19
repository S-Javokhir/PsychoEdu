import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('PsychoEduBootstrap');
  const app = await NestFactory.create(AppModule);

  // Global prefix for all REST endpoints
  app.setGlobalPrefix('api');

  // CORS for frontend communication
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Range', 'Accept'],
    exposedHeaders: ['Content-Range', 'Accept-Ranges', 'Content-Length'],
  });

  // Global Validation Pipe for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  // Interactive Swagger API Documentation & Playground
  const config = new DocumentBuilder()
    .setTitle('PsychoEdu API')
    .setDescription('Universitet Psixologiya Amaliy Ta’lim Platformasi — Backend REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  logger.log(`🚀 PsychoEdu Backend running on: http://localhost:${port}/api`);
  logger.log(`📑 Interactive Swagger API docs: http://localhost:${port}/api/docs`);
}

bootstrap();
