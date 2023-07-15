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
  @Prop({ required: false })
  fullName: string;
  @Prop({ required: false })
  businessAccount: boolean;
  @Prop({ required: false })
  brideName: string;
  @Prop({ required: false })
  groomName: string;
  @Prop({ required: false })
  eventPannerName: string;
  @Prop({ required: false })
  typeOfUser: 'admin' | 'private' | 'business';
  @Prop({ required: false })
  eventData: string;
  @Prop({ required: false })
  email: string;
  @Prop({ required: false })
  connectedUsers: string[];
  @Prop({ required: false })
  password: string;
  static readonly schema = Joi.object({
    fullName: Joi.when('businessAccount', {
      is: false,
      then: Joi.string().min(2).required(),
      otherwise: Joi.string().min(0),
    }),
    eventPannerName: Joi.when('businessAccount', {
      is: true,
      then: Joi.string().min(2).required(),
      otherwise: Joi.string().min(0),
    }),
    brideName: Joi.when('businessAccount', {
      is: false,
      then: Joi.string().min(2).required(),
      otherwise: Joi.string().min(0),
    }),
    groomName: Joi.when('businessAccount', {
      is: false,
      then: Joi.string().min(2).required(),
      otherwise: Joi.string().min(0),
    }),
    businessAccount: Joi.boolean().required(),
    connectedUsers: Joi.array(),
    typeOfUser: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    eventData: Joi.array(),
  });
  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
