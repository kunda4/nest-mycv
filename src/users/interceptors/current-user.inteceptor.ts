import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { UsersService } from "../users.service";

export class CurrentUserInteceptor implements NestInterceptor{
    constructor(private userService: UsersService){}
   async intercept(context: ExecutionContext, handler: CallHandler)  {
        const request = context.switchToHttp().getRequest()
        const {userId} = request.session

        if(userId){
            const user = await this.userService.findOne(userId)

        }
        return handler.handle()
    }
}