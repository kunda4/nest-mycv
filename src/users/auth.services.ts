import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";

@Injectable()
export class AuthServices{
    constructor(private userServices:UsersService){}
    async Signup(email:string, password:string){
        // check if the email is in use
        const users = await this.userServices.find(email)
        if(users.length === 0){
            throw new BadRequestException('the email is already in use')
        }
    }
    Signin(){

    }
}