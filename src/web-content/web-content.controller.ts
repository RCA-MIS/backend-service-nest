import {
  Body,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateWebsiteContentDTO } from 'src/dtos/create-website-content.dto';
import { WebContentService } from './web-content.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/payload/ApiResponse';
import { UpdateWebContentDTO } from 'src/dtos/update-website-content.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('web-content')
@ApiTags('web-content')
export class WebContentController {
  constructor(
    @Inject(WebContentService)
    private readonly webContentService: WebContentService,
  ) {}
  @Post('create')
  // @UseInterceptors(
  //   FileFieldsInterceptor([
  //     { name: 'main', maxCount: 1 },
  //     { name: 'vava', maxCount: 1 },
  //   ]),
  // )
  async createWebContent(
    @Body() dto: CreateWebsiteContentDTO,
    // @UploadedFiles()
    // files: { main?: Express.Multer.File[]; vava: Express.Multer.File[] },
  ) {
    // console.log(files);
    return new ApiResponse(
      true,
      'The web content was created successfully ',
      await this.webContentService.createWebContent(dto),
    );
  }

  @Post('update')
  async updateWebContent(@Body() dto: UpdateWebContentDTO) {
    return new ApiResponse(
      true,
      'the web content updated successfully',
      await this.webContentService.UpdateContent(dto),
    );
  }
}
