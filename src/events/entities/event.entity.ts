import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Joi from 'joi';

@Schema()
export class Event {
  @Prop({ required: true })
  numOfGuest: number;
  @Prop({ required: true })
  eventUser: string;
  @Prop({ required: false })
  eventPlanner: string;
  @Prop({ required: true })
  hasEventPlanner: boolean;
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
    eventPlanner: Joi.string().allow(''),
    hasVenue: Joi.boolean().required(),
    hasEventPlanner: Joi.boolean(),
    venueName: Joi.string(),
    dateOfWedding: Joi.date(),
    budget: Joi.number(),
    tasks: Joi.array().items(Joi.string()),
  });
}
export const EventSchema = SchemaFactory.createForClass(Event);
