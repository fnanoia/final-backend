import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //enable global validations
  app.useGlobalPipes(new ValidationPipe());

  //swagger documentation
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setVersion('1.0')
    .addTag('products')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [
      // modulos de entidades para documentar
    ],
  });

  SwaggerModule.setup('/api/docs', app, document);

  //export config values and define port
  const configService = app.get(ConfigService);
  const port = +configService.get<number>(SERVER_PORT) || 3000;

  await app.listen(port);
  console.log(`listening on port ${await app.getUrl()}`);
}
bootstrap();
