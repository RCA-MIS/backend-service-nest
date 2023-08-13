import { InitiatorAudit } from "src/audits/Initiator.audit";
import { Column, OneToOne } from "typeorm";
import { Student } from "./student.entity";

export class Report extends InitiatorAudit{

    @Column({
        nullable:false,
        name:"report_name"
    })
    reportName: String;

    @Column({
        nullable:false,
        name:"student"
    })
    @OneToOne(() => Student)
    student : Student

}