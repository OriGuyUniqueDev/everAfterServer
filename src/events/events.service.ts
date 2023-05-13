import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}
  async create(createEventDto: CreateEventDto) {
    const newEvent = new this.eventModel(createEventDto);
    // check the user input
    CreateEventDto.validate(createEventDto);
    //check if the user exist in the database

    //add event
    try {
      const createdEvent = await newEvent.save();
      return createdEvent;
    } catch (error) {
      throw new NotFoundException('Event not created');
    }
  }

  async findAll() {
    const allEvent = await this.eventModel.find();
    if (!allEvent) throw new NotFoundException('No Events found');
    return allEvent;
  }

  async findOne(id: string) {
    const event = await this.eventModel.findOne({ _id: id });
    if (!event) throw new NotFoundException('event not found');
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const res = await this.eventModel.updateOne({ _id: id }, updateEventDto, {
      returnOriginal: false,
    });
    if (res.matchedCount === 0) throw new NotFoundException('Event not found');
    return 'Event Updated';
  }

  async remove(id: string) {
    const eventToDelete = await this.eventModel.deleteOne({ _id: id });
    if (eventToDelete.deletedCount === 0)
      throw new NotFoundException('Event not found');
    return 'Event deleted successfully';
  }
}
