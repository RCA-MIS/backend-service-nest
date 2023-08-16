import { ChildEntity, Column, Entity } from "typeorm";
import { User } from "./user.entity";

@ChildEntity("teacher")
export class Teacher extends User{

    @Column({
        nullable : true,
        default : 343434
    })

    teacherId : number;
}