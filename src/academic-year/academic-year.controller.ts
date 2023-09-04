import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { AcademicYearService } from './academic-year.service';
import { CreateAcademicYearDto } from 'src/dtos/create-academic_year.dto';
import { UpdateAcademicYearDto } from 'src/dtos/update-academic_year.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('academic-year')
@ApiTags('academic-year')
export class AcademicYearController {

    constructor(
        private readonly academicYearService: AcademicYearService
    ) {}

    @Get('/all')
    getAllAcademicYear() {
        return this.academicYearService.findAll();
    }

    @Get('/:id')
   async getAcademicYearById(@Param('id') id : string) {
        const AcademicYear = await this.academicYearService.findOne(parseInt(id));
        if(!AcademicYear) return new NotFoundException("Academic year not found");
        return AcademicYear;
    }

    @Post('/create')
    @ApiBody({type: CreateAcademicYearDto})
    createAcademicYear(@Body() academicYear : CreateAcademicYearDto) {
        return this.academicYearService.create(academicYear);
    }

    @Patch('/update/:id')
    @ApiBody({type: UpdateAcademicYearDto})
    updateAcademicYear(@Param('id') id : string , @Body() academicYear : UpdateAcademicYearDto) {
        return this.academicYearService.update(parseInt(id), academicYear);
    }

    @Delete('/delete/:id')
    deleteAcademicYear(@Param('id') id : string) {
        return this.academicYearService.delete(parseInt(id));
    }
}
