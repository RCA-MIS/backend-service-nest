/* eslint-disable */ 
import { ERole } from "src/Enum/ERole.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    role_name : string
}