import { Module } from '@nestjs/common';
import { ReportCardController } from './report-card.controller';
import { ReportCardService } from './report-card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportCard } from 'src/entities/report_card.entity'; 
import { UsersModule } from 'src/users/users.module';
import { TermModule } from 'src/term/term.module';
import { StudentsModule } from 'src/students/students.module';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [ReportCardController],
  providers: [ReportCardService],
  imports : [TypeOrmModule.forFeature([ReportCard]) , UsersModule , FilesModule , StudentsModule , TermModule],
})
export class ReportCardModule {}
