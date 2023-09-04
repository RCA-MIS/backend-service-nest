import { EReportCardStatus } from "src/Enum/EReportCardStatus.enum";
import { Student } from "./student.entity";

export class ReportCard{
    id: number;
    student: Student;
    termId : number;
    status: EReportCardStatus;
    createdAt: Date;
    updatedAt: Date;
}