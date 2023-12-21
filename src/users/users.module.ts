import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { AuthServices } from './auth.services';
import { CurrentUserInteceptor } from './interceptors/current-user.inteceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, AuthServices, {
    provide: APP_INTERCEPTOR,
    useClass:CurrentUserInteceptor
  }]
})
export class UsersModule {}
