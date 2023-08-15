import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Joi from 'joi';
import BudgetDetails from 'src/interfaces/BudgetDetails';
import GuestType from 'src/interfaces/GuestType';
import TodoType from 'src/interfaces/TaskTodo';

export interface ExpensesType {
  id: number;
  name: string;
  totalCost: number;
  deposit: number;
}

@Schema()
export class Event {
  @Prop({ required: true })
  numOfGuest: number;
  @Prop({ required: true })
  presents: number;
  @Prop({ required: true })
  mealPrice: number;
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
  alreadyPaid: number;
  @Prop({ required: false })
  leftToSpend: number;
  @Prop({ required: false })
  totalSpent: number;
  @Prop({ required: false })
  totalBudget: number;
  @Prop({ required: false })
  groomSide: number;
  @Prop({ required: false })
  totalGuestByList: number;
  @Prop({ required: false })
  brideSide: number;
  @Prop({ required: false })
  expenses: ExpensesType[];
  @Prop({ required: false })
  guestList: GuestType[];
  @Prop({ required: false })
  tasks: TodoType[];
  @Prop({ required: false })
  totalTodoLeft: number;
  @Prop({ required: false })
  todoCompleted: number;
  @Prop({ required: false })
  todoHigh: number;
  @Prop({ required: false })
  todoLow: number;
  @Prop({ required: false })
  connectedUser: string;
  static readonly schema = Joi.object({
    numOfGuest: Joi.number().required(),
    presents: Joi.number().required(),
    alreadyPaid: Joi.number().required(),
    totalGuestByList: Joi.number().required(),
    groomSide: Joi.number().required(),
    brideSide: Joi.number().required(),
    leftToSpend: Joi.number().required(),
    totalSpent: Joi.number().required(),
    totalBudget: Joi.number().required(),
    mealPrice: Joi.number().required(),
    eventUser: Joi.string().required(),
    eventPlanner: Joi.string().allow(''),
    hasVenue: Joi.boolean().required(),
    hasEventPlanner: Joi.boolean(),
    venueName: Joi.string(),
    dateOfWedding: Joi.date(),
    budget: Joi.number(),
    todoLow: Joi.number(),
    todoHigh: Joi.number(),
    todoCompleted: Joi.number(),
    totalTodoLeft: Joi.number(),
    tasks: Joi.array().items(Joi.string()),
    guestList: Joi.array().items(Joi.string()),
    budgetDetails: Joi.object(),
    connectedUser: Joi.string(),
  });
}
export const EventSchema = SchemaFactory.createForClass(Event);
