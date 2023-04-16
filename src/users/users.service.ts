import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  getAllUsers(type?: User['typeOfUser']) {
    return;
  }
}
