import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private Repo:Repository<UserEntity>){}
       create(email: string, password: string){
        const user = this.Repo.create({email, password})
        return this.Repo.save(user)
       }
}
