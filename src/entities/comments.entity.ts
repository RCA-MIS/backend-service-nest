import { Column, Entity, PrimaryGeneratedColumn , ManyToOne } from "typeorm";
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

    @ManyToOne(() => User)
    writer: User;

    @Column({nullable : true})
    @ManyToOne(() => News)
    news : News;

    @Column({nullable : true})
    @ManyToOne(() => Project)
    project : Project

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}