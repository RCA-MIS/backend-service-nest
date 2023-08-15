/* eslint-disable */ 
import { Controller , Get , Post , Patch , Delete , Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Controller('projects')
export class ProjectController {
    constructor(
        private projectService: ProjectService,
    ) {}

    @Get("/all")
    getAllProjects(){
        return this.projectService.getAllProjects();
    }

    @Get("/:id")
    async getProjectById(@Param('id') id : string){
        const project = await this.projectService.getProjectById(parseInt(id));
        if(!project) return new NotFoundException("Project Not Found")
        return project;
    }

    @Post("/create")
    createProject(){}

    @Patch("/update/:id")
    updateProject(){}

    @Delete("/delete/:id")
    deleteProject(@Param('id') id : string){
        return this.projectService.deleteProject(parseInt(id));
    }
}
