
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors(); // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Nếu bạn cần gửi cookies
  });
  const logger = new Logger('Bootstrap');
  const config = new DocumentBuilder()
    .setTitle('Swagger')
    .setDescription('Api description')
    .setVersion('1.0')
    .addTag('LoginNest')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3002);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
