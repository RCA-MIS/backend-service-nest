import { Module } from '@nestjs/common';
import { TermController } from './term.controller';
import { TermService } from './term.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Term } from 'src/entities/term.entity';
import { AcademicYearModule } from 'src/academic-year/academic-year.module';

@Module({
  controllers: [TermController],
  providers: [TermService],
  imports : [TypeOrmModule.forFeature([Term]) , AcademicYearModule],
})
export class TermModule {}
