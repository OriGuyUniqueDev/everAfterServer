import { Controller, Get, Query } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers(@Query() type: User['typeOfUser']) {
    return this.userService.getAllUsers(type);
  }
}
