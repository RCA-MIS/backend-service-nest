import { Module } from '@nestjs/common';
import { AcademicYearController } from './academic-year.controller';
import { AcademicYearService } from './academic-year.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicYear } from '../entities/academic_year.entity';

@Module({
  controllers: [AcademicYearController],
  providers: [AcademicYearService],
  imports: [TypeOrmModule.forFeature([AcademicYear])],
})
export class AcademicYearModule {}
