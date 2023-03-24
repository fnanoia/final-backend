import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PORT } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //enable global validations
  app.useGlobalPipes(new ValidationPipe());

  //swagger documentation
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);

  //export config values and define port
  const configService = app.get(ConfigService);
  const port = +configService.get<number>(PORT) || 3000;

  await app.listen(port);
  console.log(`listening on port ${port}`);
}
bootstrap();
