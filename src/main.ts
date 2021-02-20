import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    // {
    //   logger: ['error', 'warn', 'debug']
    // }
  );
  // Remove line below to enable local ValidationPipe settings
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
