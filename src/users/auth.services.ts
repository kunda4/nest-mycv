import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";


const scrypt = promisify(_scrypt)
@Injectable()
export class AuthServices{
    constructor(private userServices:UsersService){}
    async Signup(email:string, password:string){
        // check if the email is in use
        const users = await this.userServices.find(email)
        if(users.length === 0){
            throw new BadRequestException('the email is already in use')
        }

        //generate salt
        const saltPass = randomBytes(8).toString('hex')

        //hash the salt and password together 
        const hash = (await scrypt(password, saltPass, 32))as Buffer
    }
    Signin(){

    }
}