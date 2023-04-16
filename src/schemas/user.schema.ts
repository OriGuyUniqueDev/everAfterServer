import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { EventType } from './event.schema';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  typeOfUser: 'Admin' | 'Business' | 'Private';
  @Prop()
  country: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EventType' }] })
  relatedEvent: EventType;
}
export const UserSchema = SchemaFactory.createForClass(User);
