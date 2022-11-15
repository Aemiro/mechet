import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './infrastructure/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: false,
      docExpansion: 'none',
    },
    customSiteTitle: 'Mechet API Documentation',
  };
  const config = new DocumentBuilder()
    .setTitle('Mechet API')
    .setDescription('Mechet API Documentation')
    .setVersion('1.0')
    .setContact(
      'Vintage Technology PLC',
      'http://vintechplc.com/',
      'marketing@vintechplc.com',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  // pipes
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('/', app, document, customOptions);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  const PORT = process.env.PORT || 3000;
  await app.listen(+PORT);
}
bootstrap();
