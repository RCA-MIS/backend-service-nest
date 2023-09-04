import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AcademicYear{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    startYear: number;

    @Column()
    endYear: number;

    @Column()
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;
}