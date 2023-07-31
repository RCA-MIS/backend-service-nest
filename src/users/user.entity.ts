import { Entity, PrimaryGeneratedColumn , Column , IsNull, OneToMany, OneToOne, ManyToOne, JoinColumn,  } from "typeorm";
import { EGender } from "../Enum/EGender.enum";
import { EUserStatus } from "../Enum/EUserStatus.enum";
import { Role } from "src/role/role.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    email : string;

    @Column()
    username : string;

    @Column()
    phonenumber : string = "";

    @Column({
        nullable : true,
        default : null
    })
    last_login : Date;

    @Column()
    gender : EGender;

    @Column({
        nullable : true,
        default : null
    })
    profile_pic : string;

    @Column()
    password : string;

    @Column({
        default : new Date(Date.now())
    })
    created_at : Date;

    @Column({
        nullable : true,
        default : null
    })
    updated_at : Date;

    @Column()
    activationCode : number;

    @Column()
    status : EUserStatus;

    @ManyToOne(()=> Role )
    role : Role;

    @Column()
    national_id : string;

    @Column({
        nullable : true,
        default : null
    })
    studentId : number;

    @Column({
        nullable : true,
        default : null
    })
    teacherId : number;
}