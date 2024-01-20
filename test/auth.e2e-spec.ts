// import { Test, TestingModule } from "@nestjs/testing";
// import { INestApplication, Post } from "@nestjs/common";
// import * as request from 'supertest';
// import { AppModule } from "./../src/app.module";
// import { setupApp } from "./../src/settup-app";

// describe('AuthController (e2e)', () => {
//     let app: INestApplication;

//     beforeEach(async () => {
//         const moduleFixture: TestingModule = await Test.createTestingModule({
//             imports: [AppModule],
//         }).compile()

//         app = moduleFixture.createNestApplication();
//         setupApp(app)
//         await app.init();
//     })
//     it('should create new user', async () =>{
//         let email:string ='kunda@gmail.com'
//         const res = await request(app.getHttpServer())
//             .post('/auth/signup')
//             .send({ email, password: 'kunda123' })
//             .expect(201);
//         const { id, email: email_1 } = res.body;
//         expect(id).toBeDefined();
//         expect(email_1).toEqual(email_1);
//     })
// })