import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
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
    const payload = { email: user.email, id: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
