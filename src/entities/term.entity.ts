import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AcademicYear } from "./academic_year.entity";

@Entity()
export class Term{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @ManyToOne(()=> AcademicYear)
    academic_year : AcademicYear

    @Column()
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;
}