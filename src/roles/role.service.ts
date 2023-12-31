/* eslint-disable */
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { ERole } from '../Enum/ERole.enum';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { UUID } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { forwardRef, Inject } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { EUserType } from 'src/Enum/EUserType.enum';
import { StudentsService } from 'src/students/students.service';
import { TeachersService } from 'src/teachers/teachers.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) public roleRepo: Repository<Role>,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private studentService: StudentsService,
    @Inject(forwardRef(() => TeachersService))
    private teacherSerice: TeachersService,
  ) {}
  createRoles() {
    const roleArray: Array<ERole> = [ERole.ADMIN, ERole.STUDENT, ERole.TEACHER];
    roleArray.forEach((role) => {
      const roleEntity = this.roleRepo.create({
        role_name: ERole[role],
      });
      this.roleRepo.save(roleEntity);
    });
  }

  async getAllRoles() {
    return await this.roleRepo.find();
  }
  async getRoleByName(name: any) {
    try {
      return await this.roleRepo.findOne({ where: { role_name: name } });
    } catch (error) {
      throw error;
    }
  }

  async getRoleById(id: number) {
    console.log(id);
    const role = await this.roleRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }
}
