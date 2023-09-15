/* eslint-disable */
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Injectable,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTeacherDTO } from 'src/dtos/create-teacher.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { get } from 'http';
import { ApiResponse } from 'src/payload/ApiResponse';

@Controller('teachers')
@ApiTags('teachers')
export class TeachersController {
  constructor(
    @Inject(TeachersService) private teacherService: TeachersService,
  ) {}
  @Post('create')
  createTeacher(@Body() dto: CreateTeacherDTO) {
    return this.teacherService.createTeacher(dto);
  }

  @Patch('update/:id')
  updateTeacher(@Param('id') id: number, @Body() dto: UpdateUserDto) {}

  @Delete('delete:/id')
  deleteTeacher(@Param('id') id: number) {}

  @Delete('delete/all')
  deleteAllTeachers() {}

  @Get()
  async getAllTeachers() {
    return new ApiResponse(
      true,
      'Students retrieved successfully',
      await this.teacherService.getAllTeachers(),
    );
  }

  @Get('teacher/:id')
  getTeacher(@Param('id') id: number) {}
}
