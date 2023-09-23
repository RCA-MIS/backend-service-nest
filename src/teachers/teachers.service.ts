import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EGender } from 'src/Enum/EGender.enum';
import { Teacher } from 'src/entities/teacher.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateTeacherDTO } from 'src/dtos/create-teacher.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { EAccountStatus } from 'src/Enum/EAccountStatus.enum';
import { RoleService } from 'src/roles/role.service';
import { ERole } from 'src/Enum/ERole.enum';
import { UUID } from 'crypto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher) private teacherRepo: Repository<Teacher>,
    @Inject(forwardRef(() => RoleService))
    private rolService: RoleService,
  ) {}

  async createTeacher(dto: CreateTeacherDTO) {
    let gender: any;
    switch (dto.myGender.toLowerCase()) {
      case 'male':
        gender = EGender[EGender.MALE];
        break;
      case 'female':
        gender = EGender[EGender.FEMALE];
        break;
      default:
        throw new BadRequestException('The provided gender is invalid');
    }

    const teacherRole = await this.rolService.getRoleByName(
      ERole[ERole.TEACHER],
    );
    let teacher: Teacher = new Teacher(
      dto.firstName,
      dto.lastName,
      dto.email,
      dto.username,
      gender,
      dto.national_id,
      dto.phonenumber,
      dto.password,
      EAccountStatus.WAIT_EMAIL_VERIFICATION,
    );
    teacher.roles = [teacherRole];
    return this.teacherRepo.save(teacher);
  }

  async eTeacher(id: UUID, dto: UpdateUserDto) {
    const isTeachervailable: Teacher = await this.getTeacher(id);
    if (!isTeachervailable)
      throw new NotFoundException('The teacher with provided id is not found');
    Object.assign(isTeachervailable, dto);
    return this.teacherRepo.save(isTeachervailable);
  }

  async deleteTeacher(id: UUID) {
    const isTeachervailable: Teacher = await this.getTeacher(id);
    await this.teacherRepo.remove(isTeachervailable);
  }
  async deleteAllTeachers() {
    const allteachers: Teacher[] = await this.teacherRepo.find();
    if (allteachers.length <= 0)
      throw new ForbiddenException('There are no registered teachers');
    allteachers.forEach((teacher) => {
      this.teacherRepo.remove(teacher);
    });
  }
  async getAllTeachers() {
    return await this.teacherRepo.find({ relations: ['roles'] });
  }

  async getTeacher(id: UUID): Promise<Teacher> {
    const availableTeacher = await this.teacherRepo.findOne({
      where: { id: id },
    });
    if (!availableTeacher)
      throw new NotFoundException('The teacher with provided id is not found');
    return availableTeacher;
  }
}
