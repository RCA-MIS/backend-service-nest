/* eslint-disable */ 
import { Controller, Inject, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("students")
@Controller('students')
export class StudentsController {
    constructor(@Inject(StudentsService) private studentService:StudentsService){}
    @Post('create')
    createStudent(){
    }

}
