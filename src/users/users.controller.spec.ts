import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthServices } from './auth.services';

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
      findOne: ()=>{},
      find: ()=>{},
      remove: ()=>{},
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
