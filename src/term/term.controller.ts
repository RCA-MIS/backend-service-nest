import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TermService } from './term.service';
import { CreateTermDto } from 'src/dtos/create-term.dto';
import { UpdateTermDto } from 'src/dtos/update-term.dto';
import { NotFoundException } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorators/roles.decorator';

@Controller('term')
@ApiTags('term')
export class TermController {
  constructor(private readonly termService: TermService) {}

  @Get('/all')
  @Roles('ADMIN')
  getAllTerms() {
    return this.termService.findAll();
  }

  @Get('/:id')
  @Roles('ADMIN')
  async getTermById(@Param('id') id: string) {
    const term = await this.termService.findOne(parseInt(id));
    if (!term) return new NotFoundException('Term not found');
    return term;
  }

  @Post('/create')
  @Roles('ADMIN')
  @ApiBody({ type: CreateTermDto })
  createTerm(@Body() term: CreateTermDto) {
    return this.termService.create(term);
  }

  @Patch('update/:id')
  @Roles('ADMIN')
  @ApiBody({ type: UpdateTermDto })
  updateTerm(@Param('id') id: string, @Body() term: UpdateTermDto) {
    return this.termService.update(parseInt(id), term);
  }

  @Patch('update/academic-year/:id')
  @Roles('ADMIN')
  updateTermAcademicYear(
    @Param('id') id: string,
    @Body()
    year: {
      academic_year_id: string;
    },
  ) {
    return this.termService.updateAcademicYear(
      parseInt(id),
      parseInt(year.academic_year_id),
    );
  }

  @Delete('delete/:id')
  @Roles('ADMIN')
  deleteTerm(@Param('id') id: string) {
    return this.termService.delete(parseInt(id));
  }
}
