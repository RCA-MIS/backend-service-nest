/* eslint-disable */ 
import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/roles/role.module';
import { UtilsModule } from 'src/utils/utils.module';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  controllers: [UsersController],
  providers: [UsersService, {provide:APP_GUARD, useClass:RolesGuard}],
  imports: [TypeOrmModule.forFeature([User]) , RoleModule, UtilsModule, JwtModule],
  exports : [UsersService]
})
export class UsersModule {}
