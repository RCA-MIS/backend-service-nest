/* eslint-disable */ 
import { Entity, PrimaryGeneratedColumn , Column , IsNull, OneToMany, OneToOne, ManyToOne, JoinColumn, BaseEntity, TableInheritance, ManyToMany,  } from "typeorm";
import { EGender } from "../Enum/EGender.enum";
import { EAccountStatus } from "../Enum/EAccountStatus.enum";
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

    @Column({
        type:String,
        enum:EGender,
        default:EGender[EGender.MALE]
    })
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
    status : String;

    @ManyToMany(()=> Role )
    roles : Role[];

    @Column()
    national_id : string;

}