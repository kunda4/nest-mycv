import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ViewUserDto } from './dtos/view-user.dto';

@Controller('auth')
export class UsersController {
    constructor(private userService:UsersService){}
    @Post('/signup')
    createUser(@Body() body:CreateUserDto){
        return this.userService.create(body.email, body.password)
    }
    @Serialize(ViewUserDto)
    @Get('/:id')
     async findUser(@Param('id') id:string){
        const user = await this.userService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException('User does not exist!!!')
        }
         return user
    }
    @Serialize(ViewUserDto)
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

