/* eslint-disable */ 
import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { UsersModule } from 'src/users/users.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [ProjectController],
  imports : [TypeOrmModule.forFeature([Project]) , UsersModule , FilesModule],
  providers: [ProjectService],
  exports : [ProjectService]
})
export class ProjectsModule {}
