import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
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
import { APP_GUARD } from '@nestjs/core';
import {} from './authorization/roles.guard';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';
import { LocalAuthGuard } from './auth/local-auth.guard';
dotenv.config();

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
  // providers: [LocalAuthGuard],
})
export class AppModule {}
