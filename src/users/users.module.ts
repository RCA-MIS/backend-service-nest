/* eslint-disable */ 
import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/roles/role.module';
import { UtilsModule } from 'src/utils/utils.module';

@Global()
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]) , RoleModule, UtilsModule],
  exports : [UsersService]
})
export class UsersModule {}
