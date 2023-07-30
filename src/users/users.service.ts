import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class UsersService {

    constructor(
       @InjectRepository(User) private userRepo : Repository<User>
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

    async createUser(){
      
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
