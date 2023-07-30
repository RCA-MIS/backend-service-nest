import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';


@Module({
  imports: [UsersModule, StudentsModule, TeachersModule]
})
export class AppModule {}
