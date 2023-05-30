import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { log } from 'console';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    let hasRequiredRoles: boolean = false;
    for(let i = 0; i <= requiredRoles.length; i++){
      if (context.switchToHttp().getRequest().user.typeOfUser === requiredRoles[i]) {
        hasRequiredRoles = true;
        break
      } else {
        hasRequiredRoles = false;
      }
    }
    return hasRequiredRoles;
  }
}
    // requiredRoles.forEach((role) => {
    //   if (context.switchToHttp().getRequest().user.typeOfUser === role) {

        
    //     hasRequiredRoles = true;
    //     console.log('roles guard - continue');
        
    //     return true;
    //   } else {
    //     hasRequiredRoles = false;
    //   }
    // });
