import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }
  async validate(username: string, pass: string) {
    const user = await this.authService.validateUser(username, pass);

    if (!user) {
      throw new UnauthorizedException();
    }
    const { ...rest } = user;
    const { password, ...userToSend } = rest._doc;
    return userToSend;
  }
}
