import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";


export class CanEditUserInfoGuard implements CanActivate {
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean  {
        let user =  context.switchToHttp().getRequest().user
        let paramEmail = context.switchToHttp().getRequest().params.email
        console.log('CanEditUserInfoGuard guard',user.typeOfUser);
        
        switch (user.typeOfUser) {
            case 'business':
                //edit his own details
                if (user.email === paramEmail) {
                        console.log('CanEditUserInfoGuard guard - continue');

                    return true
                }
                //can edit user info
                user.connectedUsers.forEach((email:string) => {
                    if(email === paramEmail){
                        console.log('CanEditUserInfoGuard guard - continue');

                        return true
                    }else{
                        return false
                    }
                });
            case 'private':
                if (user.email === paramEmail) {
                        console.log('CanEditUserInfoGuard guard - continue');

                    return true
                }else{
                    return false
                }
            default:
                console.log('CanEditUserInfoGuard guard - continue');
                
                return true
        }
    }
}