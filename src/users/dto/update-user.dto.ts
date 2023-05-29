import { BadRequestException } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import * as Joi from 'joi';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  readonly fullName: string;
  readonly brideName: string;
  readonly groomName: string;
  readonly typeOfUser: 'admin' | 'private' | 'business';
  readonly eventData: string;
  readonly email: string;
  readonly password: string;
  static readonly schema = Joi.object({
    fullName: Joi.string(),
    brideName: Joi.string(),
    groomName: Joi.string(),
    typeOfUser: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
  });
  static validate(data: UpdateUserDto) {
    // validate the user data
    const { error } = UpdateUserDto.schema.validate(data);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    return data;
  }
}
/*
     "fullName":"Yuval ben haim",
  "brideName": "Yuval",
   "groomName": "Dani",
   "typeOfUser": "private",
   "email": "yuvaldani@gmail.com",
   "password":"12345678"

*/
