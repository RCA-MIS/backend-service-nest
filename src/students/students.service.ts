import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { MailingService } from 'src/mailing/mailing.service';
import { Repository } from 'typeorm';
import { CreateStudentDTO } from 'src/dtos/create-student.dto';
import { UpdateStudentDTO } from 'src/dtos/update-student.dto';
import { UsersService } from 'src/users/users.service';
import { EAccountStatus } from 'src/Enum/EAccountStatus.enum';
import { EGender } from 'src/Enum/EGender.enum';
import { ERole } from 'src/Enum/ERole.enum';
import { UUID } from 'crypto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class StudentsService {
  roleService: any;
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    private mailingService: MailingService,
    @Inject(forwardRef(() => UsersService)) private userService: UsersService,
  ) {}

  async createStudent(dto: CreateStudentDTO) {
    const email: any = dto.email;
    const isStudentAvailable = await this.studentRepo.findOne({
      where: {
        email: email,
      },
    });

    if (isStudentAvailable)
      throw new ForbiddenException('The student is already registered');
    let gender: any;
    switch (gender.toLowerCase()) {
      case 'male':
        gender = EGender[EGender.MALE];
        break;
      case 'female':
        gender = EGender[EGender.FEMALE];
        break;
      default:
        throw new BadRequestException('The provided gender is invalid');
    }

    const studentRole = await this.roleService.getRoleByName(
      ERole[ERole.STUDENT],
    );
    let student = new Student(
      dto.firstName,
      dto.lastName,
      dto.email,
      gender,
      dto.national_id,
      EAccountStatus.WAIT_EMAIL_VERIFICATION,
    );
    student.password = `student@rca4`;
    student.roles = [studentRole];
    return this.studentRepo.save(student);
  }

  async saveStudent(student: User) {
    if (!student)
      throw new BadRequestException('The provided student to save is null');
    return await this.studentRepo.save(student);
  }
  async updateStudent(id: number, dto: UpdateStudentDTO) {
    const student = await this.userService.getUserByEmail(dto.email);
    Object.assign(student, dto);
    return this.studentRepo.save(student);
  }
  async deleteStudent(id: UUID) {
    const student = await this.studentRepo.find({
      where: {
        id: id,
      },
    });
    await this.studentRepo.remove(student);
  }
  async delteAllStudents() {
    const students = await this.studentRepo.find();
    if (!students)
      throw new ForbiddenException('There are no registered students');
    students.forEach((student) => {
      this.studentRepo.remove(student);
    });
  }
  async getAllStudents() {
    return await this.studentRepo.find({ relations: ['roles'] });
  }

  async findOne(id: UUID) {
    return await this.studentRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  getStudent(id: UUID) {
    return this.userService.getUserById(id, 'Student');
  }
}
