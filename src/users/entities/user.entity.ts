import { Event } from 'src/events/entities/event.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Joi from 'joi';
import * as bcrypt from 'bcrypt';
import mongoose, { HydratedDocument } from 'mongoose';
import { type } from 'os';

// export interface UserDocument extends mongoose.Document {
//   _id: string;
//   fullName: string;
//   brideName: string;
//   groomName: string;
//   typeOfUser: 'admin' | 'private' | 'business';
//   eventData: Event;
//   email: string;
//   password: string;
// }
export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  // @Prop({ required: false })
  // _id: string;
  @Prop({ required: true })
  fullName: string;
  @Prop({ required: false })
  brideName: string;
  @Prop({ required: false })
  groomName: string;
  @Prop({ required: true })
  typeOfUser: 'admin' | 'private' | 'business';
  @Prop({ required: false, type: Event })
  eventData: Event;
  @Prop({ required: true })
  email: string;
  @Prop({ required: false })
  connectedUsers: string[];
  @Prop({ required: true })
  password: string;
  static readonly schema = Joi.object({
    fullName: Joi.string().required(),
    brideName: Joi.string().optional(),
    groomName: Joi.string(),
    connectedUsers: Joi.array(),
    typeOfUser: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
