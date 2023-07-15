import { BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

export class CreateUserDto {
  fullName: string;
  brideName: string;
  groomName: string;
  typeOfUser: 'admin' | 'private' | 'business';
  eventData: string;
  businessAccount: boolean;
  eventPannerName: string;
  connectedUsers: string[];
  email: string;
  password: string;
  static schema = Joi.object({
    fullName: Joi.when('businessAccount', {
      is: false,
      then: Joi.string().min(2),
      otherwise: Joi.string().min(0),
    }),
    eventPannerName: Joi.when('businessAccount', {
      is: true,
      then: Joi.string().min(2),
      otherwise: Joi.string().min(0),
    }),
    brideName: Joi.when('businessAccount', {
      is: false,
      then: Joi.string().min(2),
      otherwise: Joi.string().min(0),
    }),
    groomName: Joi.when('businessAccount', {
      is: false,
      then: Joi.string().min(2),
      otherwise: Joi.string().min(0),
    }),
    businessAccount: Joi.boolean().required(),
    connectedUsers: Joi.array(),
    typeOfUser: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    eventData: Joi.string().allow(''),
  });
  static validate(data: CreateUserDto) {
    // validate the user data
    const { error } = CreateUserDto.schema.validate(data);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    return data;
  }
}
