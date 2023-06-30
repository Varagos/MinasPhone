import { NestFactory } from '@nestjs/core';
import supertokens from 'supertokens-node';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { SupertokensExceptionFilter } from '@modules/user-management/infra/services/super-tokens/filters/auth.filter';

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
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', //['http://localhost:3000', 'http://localhost:3001'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new SupertokensExceptionFilter());
  app.setGlobalPrefix('api', {
    exclude: ['auth'],
  });
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  setupSwagger(app);

  await app.listen(process.env.PORT || 8080);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger is running on: ${await app.getUrl()}/api`);
}
bootstrap();
