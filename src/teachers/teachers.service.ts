import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { useContainer } from 'class-validator';
import { EGender } from 'src/Enum/EGender.enum';
import { EUserStatus } from 'src/Enum/EUserStatus.enum';
import { Role } from 'src/entities/role.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class TeachersService {
constructor(
    @InjectRepository(Teacher) private teacherRepo: Repository<Teacher>,
    @Inject(UsersService) private userService: UsersService
 
){}

async createTeacher (){
    const user : Teacher = new Teacher();
    user.activationCode = 3434;
    user.lastName = "valens";
    user.firstName = "xckjvhxcvjlk";
    user.email = "valens@gmail.com";
    user.national_id = "45454545";
    user.username = "valens";
    user.phonenumber = "234234234234";
    user.password = "vava2003@gmail.com";
    user.gender = EGender.FEMALE;
    user.status = EUserStatus.ACTIVE;
    user.profile_pic = "fsdfsdf"

    const createdEntity = this.teacherRepo.create(user);
     const createddEnity =  this.teacherRepo.save(createdEntity);
     console.log(await this.teacherRepo.find({}));
    return  this.userService.userRepo.save(createdEntity)
}


}
