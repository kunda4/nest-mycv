import {Test} from '@nestjs/testing'
import { AuthServices } from './auth.services'
import { UsersService } from './users.service'
import { UserEntity } from './users.entity'
import exp from 'constants'


describe('AuthService', () =>{
    let service:AuthServices 
    let fakeUsersServices: Partial<UsersService>
    beforeEach(async ()=>{
        // create a fake copy of the user services
             fakeUsersServices = {
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
    it('throw an error when a user sign up with email which already in use', async ()=>{
        fakeUsersServices.find = ()=> Promise.resolve([{id:1, email:'kund@gmail.com', password:'kunda.123'} as UserEntity])
        try {
            await service.Signup('kunda@gmail.com','kunda.123')
        } catch (error) {
            expect(error.message).toBe('the email is already in use')
        }
    })
    it('throw an error when a user does not found', async () =>{
        try {
           await service.Signin('kunda@gmail.com', 'kunda.123') 
        } catch (error) {
            expect(error.message).toBe('The user not found')
        }
    })
    it('throw an error when an invalid password provided', async () =>{
        fakeUsersServices.find = ()=> Promise.resolve([{email: 'kunda@gmail.com', password:'kunda123'} as UserEntity])
        try {
            await service.Signin('kunda@gmail.com', '1234567')
        } catch (error) {
            expect(error.message).toBe('invalid credentials')
        }
    })
});
