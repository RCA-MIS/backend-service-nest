/* eslint-disable */ 
import { Global, Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/entities/teacher.entity';


@Global()
@Module({
  controllers:[TeachersController],
  providers: [TeachersService],
  imports:[TypeOrmModule.forFeature([Teacher])],
  exports:[TeachersService]
})
export class TeachersModule {}
