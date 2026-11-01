import { type INestApplication, ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  type OpenAPIObject,
  SwaggerModule,
} from '@nestjs/swagger';

export const GLOBAL_PREFIX = 'api';

export function configureApp(app: INestApplication): void {
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}

export function createOpenApiDocument(app: INestApplication): OpenAPIObject {
  const documentConfig = new DocumentBuilder()
    .setTitle('TokTok API')
    .setDescription('Interest points and door-to-door reports')
    .setVersion('1.0')
    .build();
  return SwaggerModule.createDocument(app, documentConfig);
}
