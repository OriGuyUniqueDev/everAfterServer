import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

export class CanEditInfoGuard implements CanActivate {
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean  {
        let user =  context.switchToHttp().getRequest().user
        let paramEmail = context.switchToHttp().getRequest().params.email
        switch (user.typeOfUser) {
            case 'business':
                return true        
            case 'private':
                if (user.email === paramEmail) {
                    return true
                }else{
                    return true
                }
            default:
                return true
        }
    }
}