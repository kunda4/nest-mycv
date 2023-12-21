import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ViewUserDto } from './dtos/view-user.dto';
import { AuthServices } from './auth.services';
import { CurrentUser } from './decorators/current-user.decorator';


@Controller('auth')
@Serialize(ViewUserDto)
export class UsersController {
    constructor(
        private userService:UsersService,
        private authService:AuthServices){}

    @Get('/whoami')
    whoAmI(@CurrentUser() user:string){
        return user
    }   
    @Post('/signup')
    async createUser(@Body() body:CreateUserDto, @Session() session:any){
        const user = await this.authService.Signup(body.email, body.password)
        session.userId = user.id
        return user
    } 
    @Post('/signin')
    async SignIn(@Body() body:CreateUserDto, @Session() session:any){
        const user = await this.authService.Signin(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Post('/signout')     
    signOut(@Session() session:any){
        return session.userId = null
    }

    @Get('/:id')
     async findUser(@Param('id') id:string){
        const user = await this.userService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException('User does not exist!!!')
        }
         return user
    }
    @Get()
    findAllUsers(@Query('email') email:string){
        return this.userService.find(email)
    }
    @Delete('/:id')
    DeleteUser(@Param('id') id:string){
        return this.userService.remove(parseInt(id))
    }
    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body:UpdateUserDto){
        return this.userService.update(parseInt(id), body)
    }
}

