import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EGender } from 'src/Enum/EGender.enum';
import { EUserStatus } from 'src/Enum/EUserStatus.enum';
import { Student } from 'src/entities/student.entity';
import { User } from 'src/entities/user.entity';
import { MailingService } from 'src/mailing/mailing.service';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student) private studentRepo:Repository<Student>,
        private mailingService : MailingService
        ){}

   async createStudent(reciever: String){
        const student : Student = new Student();
        student.activationCode = 3434;
        student.email = "valens@gmail.com";
        student.firstName = "OSFGJSLKJFSDKLF";
        student.lastName ="KJSDFSDLFKJKSLDF";
        student.phonenumber = "34343434";
        student.username = "muyoyo";
        student.password = "vava2003";
        student.gender = EGender.FEMALE;
        student.status = EUserStatus.ACTIVE;
        student.national_id = "343434";
        const createdEntity = await this.studentRepo.create(student);
        await this.studentRepo.save(createdEntity)
        return await await this.studentRepo.find()

    }
}
