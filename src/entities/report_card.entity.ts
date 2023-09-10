import { EReportCardStatus } from "src/Enum/EReportCardStatus.enum";
import { Student } from "./student.entity";
import { Term } from "./term.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReportCard{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Student)
    student: Student;

    @ManyToOne(()=> Term)
    term : Term;

    @Column({
        type: String,
        enum: EReportCardStatus,
        default: EReportCardStatus.MISSING,
    })
    status: EReportCardStatus;

    @Column()
    file : string;

    @Column()
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;
}