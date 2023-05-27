import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { boolean } from 'joi';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // console.log(context.switchToHttp().getRequest().user.typeOfUser);
    // console.log(requiredRoles[0]);
    let hasRequiredRoles: boolean = false;
    requiredRoles.forEach((role) => {
      if (context.switchToHttp().getRequest().user.typeOfUser === role) {
        console.log('true');
        hasRequiredRoles = true;
        return true;
      } else {
        hasRequiredRoles = false;
      }
    });
    return hasRequiredRoles;

    // console.log(requiredRoles);
    // return false;
  }
}
