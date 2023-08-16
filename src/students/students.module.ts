/* eslint-disable */ 
import { Global, Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { MailingModule } from 'src/mailing/mailing.module';

@Global()
@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports:[TypeOrmModule.forFeature([Student]), MailingModule],
  exports:[StudentsService]
})
export class StudentsModule {}
