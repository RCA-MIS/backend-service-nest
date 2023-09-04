/* eslint-disable */
import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  Post,
  Delete,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProjectService } from './project.service';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { CreateProjectDto } from 'src/dtos/create-project.dto';
import { UpdateProjectDto } from 'src/dtos/update-project.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get('/all')
  getAllProjects() {
    return this.projectService.getAllProjects();
  }

  @Get('/:id')
  async getProjectById(@Param('id') id: string) {
    const project = await this.projectService.getProjectById(parseInt(id));
    if (!project) return new NotFoundException('Project Not Found');
    return project;
  }

  @Post('/create')
  @ApiBody({type : CreateProjectDto})
  @UseInterceptors(FileInterceptor('image'))
  createProject(@Body() project: CreateProjectDto , @UploadedFile() file: Express.Multer.File) {
    return this.projectService.createProject(project , file);
  }

  @Patch('/update/image/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateProjectImage(@Param('id') id : string , @UploadedFile() file: Express.Multer.File) {
    return this.projectService.updateProjectImage(parseInt(id) , file);
  }


  @Patch('/update/:id')
  @ApiBody({type : UpdateProjectDto})
  updateProject(@Param('id') id: string, @Body() project: UpdateProjectDto) {
    return this.projectService.updateProject(parseInt(id), project);
  }

  @Delete('/delete/:id')
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(parseInt(id));
  }
}
