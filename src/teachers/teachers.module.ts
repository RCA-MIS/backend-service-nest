/* eslint-disable */
import { Global, Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/entities/teacher.entity';
import { RoleModule } from 'src/roles/role.module';

@Global()
@Module({
  controllers: [TeachersController],
  providers: [TeachersService],
  imports: [TypeOrmModule.forFeature([Teacher]), RoleModule],
  exports: [TeachersService],
})
export class TeachersModule {}
