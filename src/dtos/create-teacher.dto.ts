import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateTeacherDTO extends CreateUserDto {
  constructor() {
    super();
  }

  @IsNotEmpty()
  @IsNumber()
  teacherId: number;
}
