import { IsNotEmpty, IsNumber } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class UpdateTeacherDTO extends UpdateUserDto {
  constructor() {
    super();
  }
  @IsNotEmpty()
  @IsNumber()
  teacherId: number;
}
