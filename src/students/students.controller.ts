/* eslint-disable */
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateStudentDTO } from 'src/dtos/create-student.dto';
import { UpdateStudentDTO } from 'src/dtos/update-student.dto';
import { ApiResponse } from 'src/payload/ApiResponse';
import { UUID } from 'crypto';
import { Roles } from 'src/utils/decorators/roles.decorator';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(
    @Inject(StudentsService) private studentService: StudentsService,
  ) {}
  @Post('create')
  @Roles('ADMIN', 'TEACHER')
  async createStudent(@Body() dto: CreateStudentDTO) {
    return new ApiResponse(
      true,
      'student has been reated successfully',
      await this.studentService.createStudent(dto),
    );
  }
  @Delete('update:/id')
  @Roles('ADMIN', 'TEACHER')
  async updateStudent(@Param('id') id: number, @Body() dto: UpdateStudentDTO) {
    return new ApiResponse(
      true,
      'student updated successfully',
      await this.studentService.updateStudent(id, dto),
    );
  }
  @Delete('delete/:id')
  @Roles('ADMIN')
  deleteStudent(@Param('id') id: UUID) {
    return new ApiResponse(
      true,
      'Student deleted successdully',
      this.studentService.deleteStudent(id),
    );
  }
  @Delete('delete/all')
  @Roles('ADMIN', 'TEACHER')
  delteAllStudents() {
    return new ApiResponse(
      true,
      'All students have deleted successfully',
      this.studentService.delteAllStudents(),
    );
  }
  @Get()
  @Roles('ADMIN', 'TEACHER')
  async getAllStudents() {
    return new ApiResponse(
      true,
      'All students retrieved successdully',
      await this.studentService.getAllStudents(),
    );
  }
  @Get(':id')
  @Roles('ADMIN', 'TEACHER')
  getStudent(@Param('id') id: UUID) {
    return new ApiResponse(
      true,
      'student have retieved successfully',
      this.studentService.getStudent(id),
    );
  }
}
