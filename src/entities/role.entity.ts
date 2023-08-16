/* eslint-disable */ 
import { ERole } from "src/Enum/ERole.enum";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { InitiatorAudit } from "src/audits/Initiator.audit";

@Entity()
export class Role extends InitiatorAudit{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    role_name : string
    @ManyToMany(()=> User )
    users : User[];
}