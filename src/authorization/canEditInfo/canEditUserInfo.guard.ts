import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export class CanEditUserInfoGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    let user = context.switchToHttp().getRequest().user;
    let req = context.switchToHttp().getRequest();
    let paramEmail = req.params.email;
    let paramEmail2 = req.user.email;

    switch (user.typeOfUser) {
      case 'business':
        //enable to business user to search all the events
        // if (req.route.path === '/events' && req.route.methods.get === true) {
        //     return true
        // }
        //edit his own details
        if (user.email === paramEmail || user.email === paramEmail2) {
          return true;
        }
        //can edit user info
        for (let i = 0; i < user.connectedUsers.length; i++) {
          if (user.connectedUsers[i] === paramEmail) {
            return true;
          }
        }

        return false;

      case 'private':
        if (user.email === paramEmail || user.email === paramEmail2) {
          return true;
        } else {
          return false;
        }
      default:
        return true;
    }
  }
}
