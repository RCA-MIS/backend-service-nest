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
import { Roles } from 'src/utils/decorators/roles.decorator';

@Controller('teachers')
@ApiTags('teachers')
export class TeachersController {
  constructor(
    @Inject(TeachersService) private teacherService: TeachersService,
  ) {}
  @Post('create')
  @Roles('ADMIN')
  createTeacher(@Body() dto: CreateTeacherDTO) {
    return this.teacherService.createTeacher(dto);
  }

  @Patch('update/:id')
  @Roles('ADMIN')
  updateTeacher(@Param('id') id: number, @Body() dto: UpdateUserDto) {}

  @Delete('delete:/id')
  @Roles('ADMIN')
  deleteTeacher(@Param('id') id: number) {}

  @Delete('delete/all')
  @Roles('ADMIN')
  deleteAllTeachers() {}

  @Get()
  @Roles('ADMIN')
  async getAllTeachers() {
    return new ApiResponse(
      true,
      'Students retrieved successfully',
      await this.teacherService.getAllTeachers(),
    );
  }

  @Get('teacher/:id')
  @Roles('ADMIN')
  getTeacher(@Param('id') id: number) {}
}
