/* eslint-disable */ 
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';
import { CreateUserDto } from '../dtos/create-user.dto';
import { RoleService } from 'src/roles/role.service';
import { EAccountStatus } from 'src/Enum/EAccountStatus.enum';
import { EGender } from 'src/Enum/EGender.enum';
import { MailingService } from 'src/mailing/mailing.service';
import { UtilsService } from 'src/utils/utils.service';
import { LoginDTO } from 'src/dtos/lodin.dto';
import * as brcrypt from "bcrypt"
import { VerifyAccountDTO } from 'src/dtos/verifyAccount.dto';

@Injectable()
export class UsersService {

    constructor(
       @InjectRepository(User) public  userRepo : Repository<User>,
       private roleService : RoleService,
       private mailingService : MailingService,
       private utilsService: UtilsService
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
   async getUserByEmail(email:String){
      const response = await this.userRepo.findOne({
        where:{
          email:email.toString()
        }
      })
      if(!response) throw new BadRequestException("Invalid email or password");
      return response;
   }

     generateRandomFourDigitNumber(): number {
        const min = 1000;
        const max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      async login(dto:LoginDTO){
        const user = await this.getUserByEmail(dto.email)
        if(user.status == EAccountStatus[EAccountStatus.WAIT_EMAIL_VERIFICATION] || user.status == EAccountStatus[EAccountStatus.PENDING]) throw new BadRequestException("This account is not yet verified, please check your gmail inbox for verification details")
        const tokens = this.utilsService.getTokens(user);
        return tokens;
      }
      async verifyAccount(email:String){
        const verifiedAccount = await this.getUserByEmail(email);
        if(verifiedAccount.status === EAccountStatus[EAccountStatus.ACTIVE]) throw new BadRequestException("This is already verified")
        verifiedAccount.status = EAccountStatus[EAccountStatus.ACTIVE];
        const verifiedAccount2 = await  this.userRepo.save(verifiedAccount)
        const tokens = await this.utilsService.getTokens(verifiedAccount);
        delete verifiedAccount2.password;
        return {tokens, user:verifiedAccount2}
      }
      async resetPassword(email:String, activationCode:number, newPassword:String){
        const account = await this.getUserByEmail(email);
        if(account.status === EAccountStatus[EAccountStatus.PENDING] || account.status == EAccountStatus[EAccountStatus.WAIT_EMAIL_VERIFICATION]) throw new BadRequestException("Please first verify your account and we'll help you to remember your password later");
        if(account.activationCode != activationCode) throw new BadRequestException("Your provided invalid activation code, you can request another.");
        account.password = await this.utilsService.hashString(newPassword.toString());
        const savedUser = await this.userRepo.save(account);
        const tokens = await this.utilsService.getTokens(account);
        delete savedUser.password
        delete savedUser.activationCode
        return {tokens, user:savedUser}
      }
    async createUser(body : CreateUserDto){
       let  {firstName, lastName, email , username , myGender , registercode , national_id , phonenumber , password} = body;
       if(registercode != "rcaKeyAdmin"){
        return new UnauthorizedException("Incorrect Registration Key")
       }
       const status : String = EAccountStatus[EAccountStatus.WAIT_EMAIL_VERIFICATION].toString();
       let gender;
       const role = await this.roleService.getRoleById(1);
       switch(myGender.toLowerCase()){
        case 'male':
          gender = EGender[EGender.MALE];
          break;
        case 'female':
          gender = EGender[EGender.FEMALE];
          break;
        default:
          throw new BadRequestException("The provided gender is invalid")
       }
       const activationCode = this.generateRandomFourDigitNumber();
       password =  await this.utilsService.hashString(password);
       try{
      const userEntity = this.userRepo.create({
        firstName,
        lastName,
        email,
        username,
        gender,
        national_id,
        phonenumber,
        password,
        status,
        // role,
        activationCode
      });
        userEntity.roles.push(role);
        const createdEnity = this.userRepo.save(userEntity);
        await this.mailingService.sendVerificationEmail(userEntity.email.toString())
        console.log(createdEnity)
        return {success:true, message : "we have sent an verification code to your inbox , please head their and verify your account"};
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
