import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import 'dotenv/config.js';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { DevDatabaseModule } from './databases/dev-database.module';
import { ProdDatabaseModule } from './databases/prod-database.module';
import { RolesGuard } from './auth/roles-guard';
import { APP_GUARD } from '@nestjs/core';
dotenv.config();
process.env.NODE_ENV;
//demo
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.NODE_ENV === 'production'
        ? `mongodb+srv://${process.env.DBAUTH}@${process.env.DBPATH}`
        : process.env.TESTDBURL,
    ),

    UsersModule,
    EventsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
