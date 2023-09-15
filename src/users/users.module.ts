/* eslint-disable */
import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  forwardRef,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/roles/role.module';
import { UtilsModule } from 'src/utils/utils.module';
import { JwtModule } from '@nestjs/jwt';
import { UserMiddleWare } from 'src/middlewares/user.middleware';

@Global()
@Module({
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([User]),
    RoleModule,
    JwtModule,
    UtilsModule,
  ],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleWare).forRoutes('*');
  }
}
// {provide:APP_GUARD, useClass:RolesGuard}
