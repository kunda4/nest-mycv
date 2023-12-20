import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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
        if(users.length !== 0){
            throw new BadRequestException('the email is already in use')
        }

        //generate salt
        const saltPass = randomBytes(8).toString('hex')

        //hash the salt and password together 
        const hash = (await scrypt(password, saltPass, 32))as Buffer

        //join joined the hashed result and salt together
        const result = saltPass + '.' + hash.toString('hex')

        //create a user
        const user = await this.userServices.create(email,result)

        //return a user
        return user
    }
    async Signin(email:string, password:string){
        
        const [user] = await this.userServices.find(email)
        
        if(!user){
            throw new NotFoundException('The user not found')
        }

        const [salt, storedHash] = user.password.split('.')

        const hash = await (scrypt(password,salt,32))as Buffer

        if(storedHash !== hash.toString('hex')){
            throw new NotFoundException('invalid credentials')
        }
        return user

    }
}