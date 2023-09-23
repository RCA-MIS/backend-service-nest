/* eslint-disable */
import { Module, forwardRef } from '@nestjs/common';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { UsersModule } from 'src/users/users.module';
import { TeachersModule } from 'src/teachers/teachers.module';
import { StudentsModule } from 'src/students/students.module';

@Module({
  providers: [RoleService],
  imports: [
    TypeOrmModule.forFeature([Role]),
    forwardRef(() => UsersModule),
    forwardRef(() => TeachersModule),
    StudentsModule,
  ],
  exports: [RoleService],
})
export class RoleModule {}
