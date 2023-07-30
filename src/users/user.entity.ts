import { Entity, PrimaryGeneratedColumn , Column , IsNull } from "typeorm";
import { EGender } from "./Enum/EGender.enum";
import { EUserStatus } from "./Enum/EUserStatus.enum";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    email : string;

    @Column()
    username : string;

    @Column()
    last_login : Date;

    @Column()
    gender : EGender;

    @Column()
    profile_pic : string;

    @Column()
    password : string;

    @Column()
    created_at : Date;

    @Column()
    updated_at : Date;

    @Column()
    deleted_at : Date;

    @Column()
    activatationCode : string;

    @Column()
    status : EUserStatus;

    @Column()
    role : string;

    @Column()
    national_id : string;

    @Column()
    studentId : number;

    @Column()
    teacherId : number;
}