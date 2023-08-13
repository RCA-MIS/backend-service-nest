import { Column, Entity } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Teacher extends User{
    @Column({
        nullable : true,
        default : null
    })
    teacherId : number;
}