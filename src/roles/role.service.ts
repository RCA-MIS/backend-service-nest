/* eslint-disable */
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { ERole } from '../Enum/ERole.enum';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) public roleRepo: Repository<Role>) {}
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

  async getRoleByName(roleName: any) {
    try {
      return await this.roleRepo.findOne({ where: { role_name: roleName } });
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
