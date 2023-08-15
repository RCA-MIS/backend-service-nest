import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
    constructor(@InjectRepository(Student) private studentRepo:Repository<Student>){}

   async createStudent(){
        const student : Student = new Student();
        student.activationCode = 3434;
        student.email = "valens@gmail.com";
        student.firstName = "valens";
        student.lastName ="niyo";
        student.phonenumber = "34343434";
        student.username = "rersfsf";
        student.password = "vava2003";

        const createdEntity = await this.studentRepo.create(student);
        return await this.studentRepo.save(createdEntity)

    }
}
