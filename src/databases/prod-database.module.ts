import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getProdDatabaseConfig } from './prod-db.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: getProdDatabaseConfig,
    }),
  ],
})
export class ProdDatabaseModule {}
