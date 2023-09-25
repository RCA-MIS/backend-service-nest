import { ChildEntity, Column, Entity } from 'typeorm';
import { User } from './user.entity';
import { EGender } from 'src/Enum/EGender.enum';
import { EAccountStatus } from 'src/Enum/EAccountStatus.enum';

@ChildEntity('student')
export class Student extends User {
  constructor(
    firstName: String,
    lastName: String,
    email: String,
    myGender: EGender,
    national_id: String,
    status: EAccountStatus,
  ) {
    super(
      firstName,
      lastName,
      email,
      '',
      myGender,
      national_id,
      '',
      'student@rca',
      status,
    );
  }
  @Column({
    nullable: true,
    default: null,
  })
  studentId: number;
}
