import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { News } from "./news.entity";
import { Project } from "./project.entity";
import { User } from "./user.entity";

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    likes: number;

    @Column()
    writer: User;

    @Column({nullable : true})
    news : News;

    @Column({nullable : true})
    project : Project

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}