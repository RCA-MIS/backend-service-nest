import { ChildEntity, Column, Entity } from "typeorm";
import { User } from "./user.entity";

@ChildEntity("student")
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