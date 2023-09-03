/* eslint-disable */ 
import { Column, Entity , ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Project {
     
    @PrimaryGeneratedColumn()
    id : number;

    @Column({ type: "varchar", length: 255 })
     name: string;

    @Column({ type: "varchar", length: 255 })
     description: string;

    @Column({ type: "varchar", length: 255 })
     status: string;

     @Column({ type: "varchar", length: 255 })
        image: string;

    @Column({ type: "varchar", length: 255 })
    @ManyToOne(()=> User)
     user: User;

    @Column({ type: "varchar", length: 255 })
     comments: Comment[];

    @Column({ type: "varchar", length: 255 })
     createdAt: Date;

    @Column({ type: "varchar", length: 255 })
     updatedAt: Date;
}