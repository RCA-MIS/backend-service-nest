/* eslint-disable */ 
import { Controller, Inject, Injectable, Post } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('teachers')
@ApiTags("teachers")
export class TeachersController {
    constructor(
        @Inject(TeachersService) private teacherService: TeachersService
    ){}
    @Post('create')
    createTeacher(){
        return this.teacherService.createTeacher()
    }
}
