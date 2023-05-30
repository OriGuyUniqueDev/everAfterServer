import { BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

export class CreateUserDto {
  fullName: string;
  brideName: string;
  groomName: string;
  typeOfUser: 'admin' | 'private' | 'business';
  eventData: string;
  connectedUsers:string[]
  email: string;
  password: string;
  static schema = Joi.object({
    fullName: Joi.string().required(),
    brideName: Joi.string(),
    groomName: Joi.string(),
    connectedUsers:Joi.array(),
    typeOfUser: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    eventData: Joi.array(),
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
