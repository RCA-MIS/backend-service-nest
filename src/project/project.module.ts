/* eslint-disable */ 
import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ProjectController],
  imports : [TypeOrmModule.forFeature([Project]) , UsersModule],
  providers: [ProjectService]
})
export class ProjectsModule {}
