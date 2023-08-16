/* eslint-disable */ 
import { Entity, PrimaryGeneratedColumn , Column , IsNull, OneToMany, OneToOne, ManyToOne, JoinColumn, BaseEntity, TableInheritance,  } from "typeorm";
import { EGender } from "../Enum/EGender.enum";
import { EUserStatus } from "../Enum/EUserStatus.enum";
import { Role } from "src/entities/role.entity";
import { InitiatorAudit } from "src/audits/Initiator.audit";

@Entity("users")
@TableInheritance({column: {type:"varchar", name:"type"}})
export class User extends InitiatorAudit{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    firstName: String;

    @Column()
    lastName: String

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

    @Column()
    activationCode : number;

    @Column()
    status : EUserStatus;

    @ManyToOne(()=> Role )
    role : Role;

    @Column()
    national_id : string;

}