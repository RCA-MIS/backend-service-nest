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
import { StudentsModule } from 'src/students/students.module';
import { TeachersModule } from 'src/teachers/teachers.module';

@Global()
@Module({
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([User]),
    RoleModule,
    JwtModule,
    UtilsModule,
    StudentsModule,
    TeachersModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
// {provide:APP_GUARD, useClass:RolesGuard}
