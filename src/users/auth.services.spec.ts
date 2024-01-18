import {Test} from '@nestjs/testing'
import { AuthServices } from './auth.services'
import { UsersService } from './users.service'
import { UserEntity } from './users.entity'


describe('AuthService', () =>{
    let service:AuthServices 
    let fakeUsersServices: Partial<UsersService>
    beforeEach(async ()=>{
      //  create a fake copy of the user services
            const users:UserEntity[] =[]
             fakeUsersServices = {
            find:(email:string) => {
                const filterUser = users.filter(user => user.email === email)
                return Promise.resolve(filterUser)
            },
            create:(email:string, password:string) =>{
                const user = {id:Math.floor(Math.random()*9999), email, password} as UserEntity
                users.push(user)
                return Promise.resolve(user)
            }
          
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
       
        await service.Signup('kunda@gmail.com', 'kunda.123')
        try {
            await service.Signup('kunda@gmail.com','kunda.123')
        } catch (error) {
            expect(error.message).toBe('the email is already in use')
        }
    })
    it('throw an error when a user does not found', async () =>{
        await service.Signup('kundaaggy@gmail.com', 'kunda11234')
        try {
           await service.Signin('kunda@gmail.com', 'kunda.123') 
        } catch (error) {
            expect(error.message).toBe('The user not found')
        }
    })
    it('throw an error when an invalid password provided', async () =>{
        await service.Signup('kunda@gmail.com','123456789')
        await expect(service.Signin('kunda@gmail.com', '1234567')).rejects.toThrow()
    })
    it('should return a user when the valid password provided', async()=> {
                await service.Signup('kunda@gmail.com', 'mypassword')
                const user = await service.Signin('kunda@gmail.com', 'mypassword')
                expect(user).toBeDefined()
    })
});
