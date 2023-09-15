/* eslint-disable */ 
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateProjectDto } from 'src/dtos/create-project.dto';
import { UsersService } from 'src/users/users.service';
import { FilesService } from 'src/files/files.service';
import { log } from 'console';

@Injectable()
export class ProjectService {
    constructor(
       @InjectRepository(Project) private projectRepo : Repository<Project>,
       private fileService : FilesService,
       private userService : UsersService
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

    async createProject(project : CreateProjectDto , file : Express.Multer.File){
        const {name, description, status , userEmail} = project;
        const user = await this.userService.getUserByEmail(userEmail);
        if(!user) return new NotFoundException(`User with email: ${userEmail} not found`);
        const createdAt = new Date(Date.now())
        const updatedAt = null;
        let image;
        if(!file || file == null || file == undefined) {
            image = null;
        }else{
            image = await this.fileService.uploadFile(file);
        }
        let newstatus = status.toString();
        const projectEntity = this.projectRepo.create({
            name,
            description,
            status : newstatus,
            user,
            image,
            createdAt,
            updatedAt,
        })
         await this.projectRepo.save(projectEntity);   
         return {
                message : "Project created successfully",
                data : projectEntity
         } 
    }

    async updateProjectImage(id : number , file : Express.Multer.File){
        const project = await this.projectRepo.findOne({
            where : {
                id : id
            }
        });
        if(project){
            let newImage;
            if(project.image == null){
                newImage = await this.fileService.uploadFile(file);
            }else{
                newImage =this.fileService.updateFile(project.image , file);
            }
            project.image = newImage;
            await this.projectRepo.save(project);
            return {
                message : "Project image updated successfully"
            }
        }
        return new NotFoundException("Project not found");
    }
    

    async updateProject(id : number , attrs : Partial<Project>){
        const project = await this.projectRepo.findOne({
            where : {
                id : id
            }
        });
        if(project){
            Object.assign(project,attrs);
            await this.projectRepo.save(project);
            return {
                message : "Project updated successfully"
            }
        }
        return new NotFoundException("Project not found");
    }

    async deleteProject(id : number){
        const project =  await this.projectRepo.findOne({
            where :{
                id : id
            }
        });

        if(!project){
            return new NotFoundException("Project not found");
        }

        await this.fileService.deleteFile(project.image);

        this.projectRepo.remove(project);
        return {
            message : "Project deleted successfully"
        }
        
    }

}
