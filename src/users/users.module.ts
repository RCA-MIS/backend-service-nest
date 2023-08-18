/* eslint-disable */
import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/roles/role.module';
import { UtilsModule } from 'src/utils/utils.module';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UserMiddleWare } from 'src/middlewares/user.middleware';

@Global()
@Module({
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([User]),
    RoleModule,
    UtilsModule,
    JwtModule,
  ],
  exports: [UsersService],
  providers: [UsersService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleWare).forRoutes('*');
  }
}
// {provide:APP_GUARD, useClass:RolesGuard}
