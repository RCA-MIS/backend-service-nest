import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicYear } from 'src/entities/academic_year.entity';
import { CreateAcademicYearDto } from 'src/dtos/create-academic_year.dto';
import { UpdateAcademicYearDto } from 'src/dtos/update-academic_year.dto';

@Injectable()
export class AcademicYearService {
    constructor(
        @InjectRepository(AcademicYear)
        private readonly academicYearRepository: Repository<AcademicYear>,
    ) {}

    async findAll(): Promise<AcademicYear[]> {
        return await this.academicYearRepository.find();
    }

    async findOne(id: number): Promise<AcademicYear> {
        return await this.academicYearRepository.findOne({
            where: { id: id }
        });
    }

    async create(academicYear: CreateAcademicYearDto): Promise<{
        message: string,
        data: AcademicYear
    }> {
        const { name, startYear, endYear } = academicYear;
        const createdAt = new Date(Date.now());
        const updatedAt = null;
        const academicYearEntity = this.academicYearRepository.create({
            name,
            startYear,
            endYear,
            createdAt,
            updatedAt
        });

        await this.academicYearRepository.save(academicYearEntity);

        return {
            message : "Academic year created successfully",
            data : academicYearEntity
        }
    }

    async update(id: number, attr : Partial<UpdateAcademicYearDto>): Promise<{
        message: string,
        data: AcademicYear
    }> {
        const updatedAt = new Date(Date.now());
        const academicYearEntity = await this.academicYearRepository.findOne({
            where: { id: id }
        });

        if(!academicYearEntity) throw new NotFoundException("Academic year not found");

        Object.assign(academicYearEntity, attr);

        await this.academicYearRepository.save(academicYearEntity);

        return {
            message : "Academic year updated successfully",
            data : academicYearEntity
        }
    }

    async delete(id: number): Promise<{
        message: string,
        data: AcademicYear
    }> {
        const academicYearEntity = await this.academicYearRepository.findOne({
            where: { id: id }
        });

        if(!academicYearEntity) throw new NotFoundException("Academic year not found");

        await this.academicYearRepository.delete(academicYearEntity);

        return {
            message : "Academic year deleted successfully",
            data : academicYearEntity
        }
    }

    

}
