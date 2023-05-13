import { Event } from 'src/events/entities/event.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Joi from 'joi';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  _id: string;
  fullName: string;
  brideName: string;
  groomName: string;
  typeOfUser: 'admin' | 'private' | 'business';
  eventData: Event;
  email: string;
  password: string;
}
@Schema()
export class User {
  @Prop({ required: false })
  _id: string;
  @Prop({ required: true })
  fullName: string;
  @Prop({ required: true })
  brideName: string;
  @Prop({ required: true })
  groomName: string;
  @Prop({ required: true })
  typeOfUser: 'admin' | 'private' | 'business';
  @Prop({ required: false, type: Event })
  eventData: Event;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  static readonly schema = Joi.object({
    fullName: Joi.string().required(),
    brideName: Joi.string().required(),
    groomName: Joi.string().required(),
    typeOfUser: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
