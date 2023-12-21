import { Injectable, NotFoundException } from '@nestjs/common';
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
       findOne(id:number){
        if(!id){
            return null
        }
        return this.Repo.findOne({where:{id}});
       }
       find(email:string){
        return this.Repo.find({where:{email}})
       }
      async update(id:number, attrs:Partial<UserEntity>){
        let user= await this.findOne(id)
        if(!user){
            throw new NotFoundException('The id does not found')
        }
        Object.assign(user, attrs)
        return this.Repo.save(user)
       }
      async remove(id:number){
        const user = await this.findOne(id)
        if(!user){
            throw new NotFoundException(`the user with an id ${id} not found`)
        }
        return this.Repo.remove(user)
       }
}

