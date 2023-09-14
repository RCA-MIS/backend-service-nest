/* eslint-disable */ 
import { Column, Entity , ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Project {
     
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
     name: string;

    @Column()
     description: string;

    @Column()
     status: string;

     @Column({nullable : true})
     image: string;

    @ManyToOne(()=> User)
     user: User;

    @Column()
     createdAt: Date;

    @Column({nullable : true})
     updatedAt: Date;
}