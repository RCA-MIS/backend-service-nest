/* eslint-disable */
import {
  Controller,
  Param,
  Delete,
  Get,
  Body,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Role } from 'src/entities/role.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/all')
  @Roles('ADMIN')
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    const user = await this.usersService.getUserById(id, 'User');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post('/create')
  @ApiBody({ type: CreateUserDto })
  createAdminAccount(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Patch('update/:id')
  @Roles('ADMIN')
  @ApiBody({ type: UpdateUserDto })
  updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(id, body);
  }

  @Delete('delete/:id')
  @Roles('ADMIN')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
