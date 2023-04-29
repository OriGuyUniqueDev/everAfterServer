import { BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  readonly fullName: string;
  readonly brideName: string;
  readonly groomName: string;
  readonly typeOfUser: 'admin' | 'private' | 'business';
  readonly eventData: Event[];
  readonly email: string;
  readonly password: string;
  static readonly schema = Joi.object({
    fullName: Joi.string().required(),
    brideName: Joi.string().required(),
    groomName: Joi.string().required(),
    typeOfUser: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
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
