import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDTO extends CreateUserDto {
  constructor() {
    super();
  }
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  studentId: number;
}
