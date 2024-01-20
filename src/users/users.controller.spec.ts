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
      Signin: (email:string, password:string)=>{
        return Promise.resolve({email:'kunda@gmail.com', password:'kunda123'}as UserEntity)
      },
      Signup: (email:string, password:string)=>{
        return Promise.resolve({email:'kunda@gmail.com', password:'kunda123'}as UserEntity)
      },
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
      update: (id:number)=>{
        return Promise.resolve({id, email:'kunda@gmail.com', password:'kunda123'}as UserEntity)
      }
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersServices
        },
        {
          provide: AuthServices,
          useValue: fakeAuthServices
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return list of users with a given email', async ()=>{
    const users = await controller.findAllUsers('kunda@gmail.com')
    expect(users.length).toEqual(1)
    expect(users[0].email).toEqual('kundaaggy@gmail.com')
  })
  it ('should return return a user whith provided id', async ()=>{
    const user = await controller.findUser('1')
    expect(user).toBeDefined()
  })
});
