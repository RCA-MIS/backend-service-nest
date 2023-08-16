/* eslint-disable */ 
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';
import { CreateUserDto } from '../dtos/create-user.dto';
import { RoleService } from 'src/roles/role.service';
import { EUserStatus } from 'src/Enum/EUserStatus.enum';
import { EGender } from 'src/Enum/EGender.enum';
import { MailingService } from 'src/mailing/mailing.service';

@Injectable()
export class UsersService {

    constructor(
       @InjectRepository(User) public  userRepo : Repository<User>,
       private roleService : RoleService,
       private mailingService : MailingService
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

     generateRandomFourDigitNumber(): number {
        const min = 1000;
        const max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    async createUser(body : CreateUserDto){
       const {email , username , myGender , registercode , national_id , phonenumber , password} = body;
       if(registercode != "rcaKeyAdmin"){
        return new UnauthorizedException("Incorrect Registration Key")
       }
       const status : EUserStatus = EUserStatus.WAIT_EMAIL_VERIFICATION;
       const role = await this.roleService.getRoleById(10);
       const gender = EGender[myGender.toString()];
       const activationCode = this.generateRandomFourDigitNumber();
       try{
      const userEntity = this.userRepo.create({
        email,
        username,
        gender,
        national_id,
        phonenumber,
        password,
        status,
        role,
        activationCode
      })
        this.userRepo.save(userEntity);
        await this.mailingService.sendVerificationEmail(userEntity.email.toString())
        return userEntity;
      }catch(error){
          console.log(error)
      }
    }

    async updateUser(id : number , attrs : Partial<User>){
      const user = await this.getUserById(id);
      if(!user){
          throw new NotFoundException('User not found');
      }
      Object.assign(user , attrs);
      return this.userRepo.save(user);
    }

    async deleteUser(id : number){
        const user = await this.getUserById(id);
        if(!user){
            throw new NotFoundException('User not found');
        }
        this.userRepo.remove(user);
        return user;
    }
}
