import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./role.entity";
import { ERole } from "../Enum/ERole.enum";
import {log} from 'console'

@Injectable()
export class RoleService{
    constructor(
        @InjectRepository(Role) private roleRepo : Repository<Role>,
        ){}
z
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
}