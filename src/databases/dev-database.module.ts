import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getDevDatabaseConfig } from './dev-db.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: getDevDatabaseConfig,
    }),
  ],
})
export class DevDatabaseModule {}
