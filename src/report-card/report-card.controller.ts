import {
  Controller,
  Body,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  UploadedFile,
} from '@nestjs/common';
import { ReportCardService } from './report-card.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { CreateReportCardDto } from '../dtos/create-report_card.dto';
import { UpdateReportCardDto } from 'src/dtos/update-report_card.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UseInterceptors } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { log } from 'console';
import { UUID } from 'crypto';
import { Roles } from 'src/utils/decorators/roles.decorator';

@Controller('report-card')
@ApiTags('report-card')
export class ReportCardController {
  constructor(private readonly reportCardService: ReportCardService) {}

  @Get('/all')
  async findAll() {
    return await this.reportCardService.findAll();
  }

  @Get('/all/release')
  @Roles('ADMIN')
  async findAllReleased() {
    return await this.reportCardService.findAllReleased();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const reportCard = await this.reportCardService.findOne(parseInt(id));
    if (!reportCard) return new NotFoundException('Report card not found');
    return reportCard;
  }

  @Get('/student/:id')
  async findAllByStudentId(@Param('id') studentId: UUID) {
    return await this.reportCardService.findAllByStudentId(studentId);
  }

  @Get('/term/:id')
  async findAllByTermId(@Param('id') termId: string) {
    return await this.reportCardService.findAllByTermId(parseInt(termId));
  }

  @Post('/create')
  @Roles('ADMIN')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() reportCard: CreateReportCardDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.reportCardService.create(reportCard, file);
  }

  @Post('/release/all')
  @Roles('ADMIN')
  async releaseAllReports() {
    return await this.reportCardService.releaseAll();
  }

  @Post('/release/:id')
  @Roles('ADMIN')
  async releaseReport(@Param('id') reportId: string) {
    return await this.reportCardService.release(parseInt(reportId));
  }

  @Patch('/update/:id')
  @Roles('ADMIN')
  async updateReportCard(
    @Param('id') reportId: string,
    @Body() reportCard: UpdateReportCardDto,
  ) {
    return await this.reportCardService.update(parseInt(reportId), reportCard);
  }

  @Patch('/update/file/:id')
  @UseInterceptors(FileInterceptor('file'))
  @Roles('ADMIN')
  async updateReportCardFile(
    @Param('id') reportId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.reportCardService.updateReportCardFile(
      parseInt(reportId),
      file,
    );
  }

  @Delete('/delete/:id')
  @Roles('ADMIN')
  async delete(@Param('id') reportId: string) {
    return await this.reportCardService.delete(parseInt(reportId));
  }
}
