import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SocketAdapter } from './socket/socket.adapter.ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new SocketAdapter(app));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8000);
}
bootstrap();
