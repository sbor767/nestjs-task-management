import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  // The branch (dev, prod, etc) gets from 'NODE_ENV' env variable
  // When it not defined - development config is active

  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: serverConfig.origin });
    logger.log(`Accepting request from origin "${serverConfig.origin}"`);
  }
  
  const port = serverConfig.port;
  await app.listen(port);
  logger.log(`process.env.NODE_ENV=${process.env.NODE_ENV}`);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
