import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './entities/event.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [EventsController],
  providers: [EventsService, UsersService],
})
export class EventsModule {}
