import { Column, Entity } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Student extends User{
    constructor(){
        super()
    }
    @Column({
        nullable : true,
        default : null
    })
    studentId : number;

}