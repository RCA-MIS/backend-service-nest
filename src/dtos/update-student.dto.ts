import { IsNotEmpty, IsNumber } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class UpdateStudentDTO extends UpdateUserDto {
  constructor() {
    super();
  }
  @IsNotEmpty()
  @IsNumber()
  studentId: number;
}
