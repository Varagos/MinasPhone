import './instrument';
import { NestFactory } from '@nestjs/core';
import supertokens from 'supertokens-node';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { SupertokensExceptionFilter } from '@modules/user-management/infra/services/super-tokens/filters/auth.filter';
import { WinstonModule } from 'nest-winston';
import { loggerInstance } from './logger/winston.logger';
import helmet from 'helmet';
import { writeFileSync } from 'fs';

const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Minas Phone API')
    .setDescription('The minas phone API description')
    .setVersion('1.0')
    .addTag('products')
    .addTag('categories')
    .addTag('users')
    .addTag('auth')
    .addTag('orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // save swagger document to file
  writeFileSync('swagger.json', JSON.stringify(document, null, 2));
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: loggerInstance,
    }),
  });
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://admin.minasphone.gr',
      'https://admin.minasphone.gr',
      'http://minasphone.gr',
      'https://minasphone.gr',
      'https://www.minasphone.gr',
      'https://www.admin.minasphone.gr',
    ],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new SupertokensExceptionFilter());
  app.setGlobalPrefix('api', {
    exclude: ['auth', 'health'],
  });
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.use(cookieParser());
  // Disabled for now, conflict with supertokens dashboard
  // app.use(helmet());

  setupSwagger(app);

  await app.listen(process.env.PORT || 8080);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger is running on: ${await app.getUrl()}/api`);
}
bootstrap();
