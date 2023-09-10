import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Term } from '../entities/term.entity';
import { CreateTermDto } from 'src/dtos/create-term.dto';
import { UpdateTermDto } from 'src/dtos/update-term.dto';
import { AcademicYearService } from 'src/academic-year/academic-year.service';
import { parse } from 'path';
import { log } from 'console';

@Injectable()
export class TermService {
    constructor(
        @InjectRepository(Term)
        private readonly termRepository: Repository<Term>,
        private readonly academicYearService: AcademicYearService
    ) {}

    async findAll(): Promise<Term[]> {
        return await this.termRepository.find();
    }

    async findOne(id: number): Promise<Term> {
        return await this.termRepository.findOne({
            where: {
                id: id,
            }
        });
    }

    async create(term: CreateTermDto): Promise<{
        message : string,
        data: Term
    } 
    | NotFoundException> {
         const { name, startDate, endDate, academic_year_id } = term;
         const academic_year = await this.academicYearService.findOne(parseInt(academic_year_id));
         if(!academic_year) return new NotFoundException('Academic Year not found');
         const createdAt = new Date(Date.now());
         const updatedAt = null;
         const newTermEntity = this.termRepository.create({
                name,
                startDate,
                endDate,
                academic_year,
                createdAt,
                updatedAt
            });

        const newTerm = await this.termRepository.save(newTermEntity);
        return {
            message: 'Term created successfully',
            data: newTerm
        }
    }

    async update(id: number, attrs: Partial<UpdateTermDto>): Promise<{
        message : string,
        data: Term
    } 
    | NotFoundException>{
        const term = await this.termRepository.findOne({
            where: {
                id: id,
            }
        });
        if(!term) return new NotFoundException('Term not found');
         Object.assign(term, attrs);
            await this.termRepository.save(term);
        const updatedTerm = await this.termRepository.findOne({
            where: {
                id: id,
            }
        });
        return {
            message: 'Term updated successfully',
            data: updatedTerm
        }
    }

    async updateAcademicYear (id: number, academic_year_id: number): Promise<{
        message : string,
        data: Term
    }
    | NotFoundException>{
        const term = await this.termRepository.findOne({    
            where: {
                id: id,
            }
        });
        if(!term) return new NotFoundException('Term not found');
        if(!academic_year_id || academic_year_id == null || academic_year_id == undefined) return new BadRequestException('Academic Year ID is required')
        const academic_year = await this.academicYearService.findOne(academic_year_id);
        if(!academic_year) return new NotFoundException('Academic Year not found');
        if(term.academic_year === academic_year) return new BadRequestException('Academic Year Already Assigned')
        term.academic_year = academic_year;
        await this.termRepository.save(term);
        const updatedTerm = await this.termRepository.findOne({
            where: {
                id: id,
            }
        })
        return {
            message: 'Term updated successfully',
            data: updatedTerm
        }
    }


    async delete(id: number): Promise<{
        message : string,
        data: Term
    }
    | NotFoundException>{
        const term = await this.termRepository.findOne({
            where: {
                id: id,
            }
        });
        if(!term) return new NotFoundException('Term not found');
        await this.termRepository.delete(id);
        return {
            message: 'Term deleted successfully',
            data: term
        }
    }

    
}
