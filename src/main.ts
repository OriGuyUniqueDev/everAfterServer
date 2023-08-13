import { NestFactory } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from './app.module';
import { DevDatabaseModule } from './databases/dev-database.module';
import { ProdDatabaseModule } from './databases/prod-database.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'https://ever-after.netlify.app/',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
