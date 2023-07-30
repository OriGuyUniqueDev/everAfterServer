import { BadRequestException } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import Joi from 'joi';
import { ExpensesType } from '../entities/event.entity';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto {
  readonly numOfGuest: number;
  readonly eventUser: string;
  readonly eventPlanner: string;
  readonly hasEventPlanner: boolean;
  readonly hasVenue: boolean;
  readonly venueName: string;
  readonly dateOfWedding: Date;
  readonly budget: number;
  readonly mealPrice: number;
  readonly presents: number;
  readonly expenses: ExpensesType;
  readonly tasks: string[];
  readonly totalBudget: number;
  readonly totalSpent: number;
  readonly leftToSpend: number;
  readonly alreadyPaid: number;
  //   static readonly schema = Joi.object({
  //     numOfGuest: Joi.number().required(),
  //     totalBudget: Joi.number().required(),
  //     totalSpent: Joi.number().required(),
  //     leftToSpend: Joi.number().required(),
  //     alreadyPaid: Joi.number().required(),
  //     mealPrice: Joi.number().required(),
  //     presents: Joi.number().required(),
  //     eventUser: Joi.string().required(),
  //     eventPlanner: Joi.string().allow(''),
  //     hasVenue: Joi.boolean().required(),
  //     hasEventPlanner: Joi.boolean(),
  //     venueName: Joi.string().allow(''),
  //     dateOfWedding: Joi.date(),
  //     budget: Joi.number(),
  //     expenses: Joi.array().items(Joi.object()),
  //     budgetDetails: Joi.object(),
  //     tasks: Joi.array().items(Joi.string()),
  //   });
  //   static validate(data: UpdateEventDto) {
  //     // validate the user data
  //     const { error } = UpdateEventDto.schema.validate(data);
  //     if (error) {
  //       throw new BadRequestException(error.details[0].message);
  //     }

  //     return data;
  //   }
}
