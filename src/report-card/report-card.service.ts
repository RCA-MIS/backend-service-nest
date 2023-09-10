import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportCard } from 'src/entities/report_card.entity';
import { TermService } from 'src/term/term.service';
import { StudentsService } from 'src/students/students.service';
import { EReportCardStatus } from 'src/Enum/EReportCardStatus.enum';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateReportCardDto } from 'src/dtos/create-report_card.dto';
import { FilesService } from 'src/files/files.service';
import { UpdateReportCardDto } from 'src/dtos/update-report_card.dto';

@Injectable()
export class ReportCardService {
    constructor(
        @InjectRepository(ReportCard) private reportCardRepository : Repository<ReportCard>,
        private readonly termService : TermService,
        private readonly studentService : StudentsService,
        private readonly fileService : FilesService
    ){}

    findAll() {
        return this.reportCardRepository.find();
    }

    async findOne(id: number) {
        return await this.reportCardRepository.findOne({
            where:{
                id : id
            }
        });
    }

    async findAllReleased() {
        return await this.reportCardRepository.find({
            where:{
                status : EReportCardStatus.RELEASED
            }
        });
    }

    async findAllByStudentId(studentId: number) {
        const studentFetched = await this.studentService.getStudent(studentId);
        if (!studentFetched) return new NotFoundException("Student not found");
              
        return await this.reportCardRepository.find({
          where: {
            student: {
                id: studentFetched.id,
            }
          },
        });
      }
      

    async findAllByTermId(termId: number) {
        const termFetched = await this.termService.findOne(termId);
        if(!termFetched) return new NotFoundException("Term not found");
        const id = termFetched.id;
        return await this.reportCardRepository.find({
            where:{
                 term : {
                        id : id
                 }
            }
        });
    }

    async findAllByStudentIdAndTermId(studentId: number, termId: number) {
        const studentFetched = await this.studentService.getStudent(studentId);
        if (!studentFetched) return new NotFoundException("Student not found");
        const termFetched = await this.termService.findOne(termId);
        if(!termFetched) return new NotFoundException("Term not found");
        const id = termFetched.id;
        return await this.reportCardRepository.find({
            where:{
                student: {
                    id: studentFetched.id,
                },
                term : {
                    id : id
                }
            }
        });
    }


    async create(reportcard : CreateReportCardDto ,  fileAdded: Express.Multer.File) {
        const student = await this.studentService.getStudent(parseInt(reportcard.studentId));
        if(!student) return new NotFoundException("Student not found");
        const term = await this.termService.findOne(parseInt(reportcard.termId));
        if(!term) return new NotFoundException("Term not found");
        const file = await this.fileService.uploadFile(fileAdded);
        const createdAt = new Date(Date.now());
        const updatedAt = null;
        const reportCard = this.reportCardRepository.create({
            student : student,
            term : term,
            file : file,
            status : EReportCardStatus.UPLOADED,
            createdAt : createdAt,
            updatedAt : updatedAt
        })

         await this.reportCardRepository.save(reportCard);
        return {
            message : "Report card created successfully",
            reportCard : reportCard
        }
    }

    async update(id: number, reportcard : UpdateReportCardDto) {
        const reportCard = await this.reportCardRepository.findOne({
            where:{
                id : id
            }
        });
        if(!reportCard) return new NotFoundException("Report card not found");
        const student = await this.studentService.getStudent(parseInt(reportcard.studentId));
        if(!student) return new NotFoundException("Student not found");
        const term = await this.termService.findOne(parseInt(reportcard.termId));
        if(!term) return new NotFoundException("Term not found");
        const updatedAt = new Date(Date.now());
        reportCard.student.id = student.id;
        reportCard.term = term;
        reportCard.updatedAt = updatedAt;
        await this.reportCardRepository.save(reportCard);
        return {
            message : "Report card updated successfully",
            reportCard : reportCard
        }
    }

    async delete(id: number) {
        const reportCard = await this.reportCardRepository.findOne({
            where:{
                id : id
            }
        });
        if(!reportCard) return new NotFoundException("Report card not found");
        await this.reportCardRepository.delete({
            id : id
        });
        return {
            message : "Report card deleted successfully",
            reportCard : reportCard
        }
    }

    async release(id: number) {
        const reportCard = await this.reportCardRepository.findOne({
            where:{
                id : id
            }
        });
        if(!reportCard) return new NotFoundException("Report card not found");
        const status = EReportCardStatus.RELEASED;
        reportCard.status = status;
        await this.reportCardRepository.save(reportCard);
        return {
            message : "Report card released successfully",
            reportCard : reportCard
        }
    }

    async releaseAll() {
        const reportCards = await this.reportCardRepository.find();
        if(!reportCards) return new NotFoundException("Report cards not found");
        const status = EReportCardStatus.RELEASED;
        reportCards.forEach(reportCard => {
            reportCard.status = status;
        });
        await this.reportCardRepository.save(reportCards);
        return {
            message : "Report cards released successfully",
            reportCards : reportCards
        }
    }

    async updateReportCardFile(id : number , fileReport: Express.Multer.File) {
        const reportCard = await this.reportCardRepository.findOne({
            where:{
                id : id
            }
        });
        if(!reportCard) return new NotFoundException("Report card not found");
        const usualFile = reportCard.file;
        const file = await this.fileService.updateFile(usualFile ,  fileReport);
        reportCard.file = file;
        await this.reportCardRepository.save(reportCard);
        return {
            message : "Report card file updated successfully",
            reportCard : reportCard
        }
    }
     
}
 