import { ChildEntity, Column, Entity } from 'typeorm';
import { User } from './user.entity';
import { EGender } from 'src/Enum/EGender.enum';
import { EAccountStatus } from 'src/Enum/EAccountStatus.enum';

@ChildEntity('teacher')
export class Teacher extends User {
  constructor(
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    myGender: EGender,
    national_id: String,
    phonenumber: String,
    password: String,
    status: EAccountStatus,
  ) {
    super(
      firstName,
      lastName,
      email,
      username,
      myGender,
      national_id,
      phonenumber,
      password,
      status,
    );
  }
  @Column({
    nullable: false,
    default: 343434,
  })
  teacherId: number;
}
