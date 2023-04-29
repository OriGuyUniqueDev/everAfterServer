import { Schema, Document } from 'mongoose';

export interface Event extends Document {
  numOfGuest: { type: number; required: false };
  eventUser: { type: Schema.Types.ObjectId; required: true };
  eventPlanner: { type: Schema.Types.ObjectId; required: false };
  hasVenue: { type: boolean; required: true };
  venueName: { type: string; required: false };
  dateOfWedding: { type: Date; required: true };
}
