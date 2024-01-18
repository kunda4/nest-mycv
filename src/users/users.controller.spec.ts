import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthServices } from './auth.services';
import { UserEntity } from './users.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersServices: Partial<UsersService>
  let fakeAuthServices: Partial<AuthServices>

  beforeEach(async () => {
    fakeAuthServices = {
      Signin: ()=>{},
      Signup: ()=>{},
    }
    fakeUsersServices = {
      findOne: (id:number)=>{
        return Promise.resolve({id, email:'kunda@gmail.com', password:'kunda123'} as UserEntity)
      },
      find: (email:string)=>{
        return Promise.resolve([{email:'kundaaggy@gmail.com', password:'kunda123'}as UserEntity] )
      },
      remove: (id:number)=>{
        return Promise.resolve({id, email:'kunda@gmail.com',password:'kunda123'}as UserEntity)
      },
      update: ()=>{}
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
