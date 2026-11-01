import { writeFile } from 'node:fs/promises';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module.js';
import { configureApp, createOpenApiDocument } from '../configure-app.js';

const OUTPUT_FILE = new URL('../../openapi.json', import.meta.url);

const app = await NestFactory.create(AppModule, { logger: false });
configureApp(app);
const document = createOpenApiDocument(app);
await writeFile(OUTPUT_FILE, `${JSON.stringify(document, undefined, 2)}\n`);
await app.close();
