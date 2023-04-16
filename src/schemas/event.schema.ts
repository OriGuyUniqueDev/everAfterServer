import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import GuestData from 'src/interfaces/GuestData';
import TaskType from 'src/interfaces/TaskType';
export type EventDocument = HydratedDocument<EventType>;
@Schema()
export class EventType {
  @Prop()
  brideGroomName: string;
  @Prop()
  estNumGuest: number;
  @Prop()
  guestList?: GuestData[];
  @Prop()
  hasVenue: boolean;
  @Prop()
  dateOfEvent: string;
  @Prop()
  budget?: number;
  @Prop({ type: () => TaskType })
  tasks: TaskType;
  @Prop()
  location: string;
  @Prop()
  daysLeft: number;
  @Prop()
  eventPlanner: string;
}
export const EventSchema = SchemaFactory.createForClass(EventType);
