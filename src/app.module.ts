import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import 'dotenv/config.js';
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
