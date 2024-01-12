import {Test} from '@nestjs/testing'
import { AuthServices } from './auth.services'
import { UsersService } from './users.service'
import { UserEntity } from './users.entity'
import exp from 'constants'


describe('AuthService', () =>{
    let service:AuthServices 
    beforeEach(async ()=>{
        // create a fake copy of the user services
        const fakeUsersServices: Partial<UsersService> = {
            find:() => Promise.resolve([]),
            create:(email:string, password:string) =>
            Promise.resolve({id:1, email, password} as UserEntity),
        };
    
        const module = await Test.createTestingModule({
            providers:[
                AuthServices,
                {
                    provide: UsersService,
                    useValue: fakeUsersServices,
                },
            ],
        }).compile();
    
         service = module.get(AuthServices);
    })
    it('can create an instance of auth service', async () =>{
        expect(service).toBeDefined();
    })
    it('create new user with salted and hashed password', async ()=>{
        const user = await service.Signup('kundaaggy@gmail.com', '123456789')
        expect(user.password).not.toEqual('123456789')
        const [salt, hashed] = user.password.split('.')
        expect(salt).toBeDefined(),
        expect(hashed).toBeDefined()
    });
});
