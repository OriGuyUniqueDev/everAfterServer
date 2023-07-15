import { BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

export class CreateEventDto {
  readonly numOfGuest: number;
  readonly eventUser: string;
  readonly eventPlanner: string;
  readonly hasEventPlanner: boolean;
  readonly hasVenue: boolean;
  readonly venueName: string;
  readonly dateOfWedding: Date;
  readonly budget: number;
  readonly tasks: string[];
  static readonly schema = Joi.object({
    numOfGuest: Joi.number().required(),
    eventUser: Joi.string().required(),
    eventPlanner: Joi.string().allow(''),
    hasVenue: Joi.boolean().required(),
    hasEventPlanner: Joi.boolean(),
    venueName: Joi.string().allow(''),
    dateOfWedding: Joi.date(),
    budget: Joi.number(),
    tasks: Joi.array().items(Joi.string()),
  });
  static validate(data: CreateEventDto) {
    // validate the user data
    const { error } = CreateEventDto.schema.validate(data);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }

    return data;
  }
}
