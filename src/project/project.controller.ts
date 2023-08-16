/* eslint-disable */ 
import { Controller , Get , Post , Patch , Delete , Param, Body } from '@nestjs/common';
import { ProjectService } from './project.service';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { CreateProjectDto } from 'src/dtos/create-project.dto';
import { UpdateProjectDto } from 'src/dtos/update-project.dto';

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
    createProject(@Body() project : CreateProjectDto){
        return this.projectService.createProject(project);
    }

    @Patch("/update/:id")
    updateProject(@Param('id') id : string , @Body() project : UpdateProjectDto){
        return this.projectService.updateProject( parseInt(id) , project);
    }

    @Delete("/delete/:id")
    deleteProject(@Param('id') id : string){
        return this.projectService.deleteProject(parseInt(id));
    }
}
