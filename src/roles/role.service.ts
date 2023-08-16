/* eslint-disable */ 
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "../entities/role.entity";
import { ERole } from "../Enum/ERole.enum";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";

@Injectable()
export class RoleService{
    constructor(
        @InjectRepository(Role) private roleRepo : Repository<Role>,
        ){}
        createRoles(){
            const roleArray : Array<ERole> = [ERole.ADMIN , ERole.STUDENT , ERole.TEACHER];
            roleArray.forEach(role => {
                const roleEntity = this.roleRepo.create({role_name : role.toString()})
                 this.roleRepo.save(roleEntity)
            })
        }

        async getAllRoles(){
          return await this.roleRepo.find();
        }
        
        async getRoleById(id : number){
            const role = await this.roleRepo.findOne({
                where : {
                    id : id
                }
            })
            if(!role){
                throw new NotFoundException('Role not found');
            }
            return role;
        }
}