import {Test} from '@nestjs/testing'
import { AuthServices } from './auth.services'
import { UsersService } from './users.service'
import { UserEntity } from './users.entity'


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
})
