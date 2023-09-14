import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { Res } from '@nestjs/common';

@Controller('files')
@ApiTags('files')
export class FilesController {
    constructor(
        private readonly fileService : FilesService
    ) {}

    @Get(':filename')
    serveFile(@Param('filename') filename, @Res() res){
      const fileLocation = this.fileService.getFile(filename);
      if(!fileLocation || fileLocation == null){
        return new NotFoundException('File not found');
      }

      return res.sendFile(filename, {root: 'uploads'})
    }
}
