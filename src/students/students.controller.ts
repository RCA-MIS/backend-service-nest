/* eslint-disable */ 
import { Controller, Inject, Post } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
    constructor(@Inject(StudentsService) private studentService:StudentsService){}
    @Post('create')
    createStudent(){
    }

}
