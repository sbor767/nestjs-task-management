import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  // The branch (dev, prod, etc) gets from 'NODE_ENV' env variable
  // When it not defined - development config is active
  const serverConfig = config.get('server');

  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
