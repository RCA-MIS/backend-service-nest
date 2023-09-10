import { Body, Controller , Delete, Get, Param, Patch, Post  } from '@nestjs/common';
import { TermService } from './term.service';
import { CreateTermDto } from 'src/dtos/create-term.dto';
import { UpdateTermDto } from 'src/dtos/update-term.dto';
import { NotFoundException } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('term')
@ApiTags('term')
export class TermController {
    constructor(
        private readonly termService: TermService
    ) {}

    @Get('/all')
   getAllTerms() {
         return this.termService.findAll();
   }

   @Get('/:id')
   async getTermById( @Param('id') id : string) {
        const term = await this.termService.findOne(parseInt(id));
        if(!term) return new NotFoundException('Term not found');
        return term;
   }

   @Post('/create')
   @ApiBody({type: CreateTermDto})
   createTerm(@Body() term : CreateTermDto) {
        return this.termService.create(term);
   }

   @Patch('update/:id')
    @ApiBody({type: UpdateTermDto})
   updateTerm(@Param('id') id :string ,  @Body() term : UpdateTermDto) {
        return this.termService.update(parseInt(id), term);
   }

   @Patch('update/academic-year/:id')
   updateTermAcademicYear(@Param('id') id :string ,  @Body() year : {
         academic_year_id: string
   }) {
        return this.termService.updateAcademicYear(parseInt(id), parseInt(year.academic_year_id));
    }

   @Delete('delete/:id')
   deleteTerm(@Param('id') id : string) {
        return this.termService.delete(parseInt(id));
   }

}
