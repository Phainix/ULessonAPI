import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const HTTP_PORT = process.env.PORT ?? 8040;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('ULesson API Docs')
    .setVersion('0.0.1')
    .addBearerAuth({
      name: 'CustomBearerAuth',
      type: 'http',
      description: 'Custom Bearer Token Authentication',
      in: 'header',
      bearerFormat: 'JWT',
      scheme: 'Bearer',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs/api', app, document);

  await app.listen(HTTP_PORT);
  //eslint-disable-next-line no-console
  console.log(`ULesson api is running on ${await app.getUrl()}`);
  // eslint-disable-next-line no-console
  console.log(`ULesson API docs is running on ${await app.getUrl()}/docs/api`);
}
bootstrap();
