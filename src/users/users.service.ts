import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';
import { CreateUserDto } from './Dto/create-user.dto';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UsersService {

    constructor(
       @InjectRepository(User) private userRepo : Repository<User>,
       private roleService : RoleService
    ){}
    
    async getUsers(){
      const response = await this.userRepo.find();
        return response;
    }

    async getUserById(id : number){
        const response = await this.userRepo.findOne({
            where :{
                id : id
            }
        });
        if(!response){
            throw new NotFoundException('User not found');
        }
        return response;
    }

    async createUser(body : CreateUserDto){
       const {email , username , gender , registercode , national_id , phonenumber , password} = body;
       if(registercode != "rcaKeyAdmin"){
        return new UnauthorizedException("Incorrect Registration Key")
       }
       
      this.userRepo.create({
        email,
        username,
        gender,
        national_id,
        phonenumber,
        password
      })
    }

    async updateUser(){

    }

    async deleteUser(id : number){
        const user = await this.getUserById(id);
        if(!user){
            throw new NotFoundException('User not found');
        }
      
        return user;
    }
}
