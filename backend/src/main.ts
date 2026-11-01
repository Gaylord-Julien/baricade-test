import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import type { AppConfig } from './config/app-config.js';
import {
  configureApp,
  createOpenApiDocument,
  GLOBAL_PREFIX,
} from './configure-app.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  configureApp(app);
  SwaggerModule.setup(`${GLOBAL_PREFIX}/docs`, app, createOpenApiDocument(app));

  const configService = app.get<ConfigService<AppConfig, true>>(ConfigService);
  await app.listen(configService.get('port', { infer: true }));
}

await bootstrap();
