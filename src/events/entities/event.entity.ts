import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Joi from 'joi';

@Schema()
export class Event {
  @Prop({ required: true })
  numOfGuest: number;
  @Prop({ required: true })
  eventUser: string;
  @Prop({ required: true })
  eventPlanner: string;
  @Prop({ required: true })
  hasVenue: boolean;
  @Prop({ required: false })
  venueName: string;
  @Prop({ required: false })
  dateOfWedding: Date;
  @Prop({ required: false })
  budget: number;
  @Prop({ required: false })
  tasks: string[];
  static readonly schema = Joi.object({
    numOfGuest: Joi.number().required(),
    eventUser: Joi.string().required(),
    eventPlanner: Joi.string().required(),
    hasVenue: Joi.boolean().required(),
    venueName: Joi.string(),
    dateOfWedding: Joi.date(),
    budget: Joi.number(),
    tasks: Joi.array().items(Joi.string()),
  });
}
export const EventSchema = SchemaFactory.createForClass(Event);
