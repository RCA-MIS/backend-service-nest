/* eslint-disable */ 
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class ProjectService {
    constructor(
       @InjectRepository(Project) private projectRepo : Repository<Project>
    ){}

    async getAllProjects(){
        return await this.projectRepo.find();
    }

    async getProjectById(id : number){
        return await this.projectRepo.findOne({
            where : {
                id : id
            }
        });
    }

    async createProject(project : Project){
        return await this.projectRepo.save(project);    
    }

    async updateProject(id : number, project : Project){
    }

    async deleteProject(id : number){
        const project =  await this.projectRepo.find({
            where :{
                id : id
            }
        });
        if(project){
            await this.projectRepo.remove(project);
            return {
                message : "Project deleted successfully"
            }
        }

        return new NotFoundException("Project not found");
    }

}
