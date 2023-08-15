/* eslint-disable */ 
import { Global, Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';

@Global()
@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports:[TypeOrmModule.forFeature([Student])],
  exports:[StudentsService]
})
export class StudentsModule {}
