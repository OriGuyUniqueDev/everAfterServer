import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneForLogin(username);
    if (user) {
      const match = await bcrypt.compare(pass, user.password);
      if (match) {
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async login(user) {
    const payload = {
      email: user.email,
      id: user._id,
      typeOfUser: user.typeOfUser,
      connectedUsers: user.connectedUsers,
      eventUser: user.eventData,
    };

    return {
      ...payload,
      access_token: this.jwtService.sign(payload),
    };
  }
}
