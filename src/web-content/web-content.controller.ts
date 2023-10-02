import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateWebsiteContentDTO } from 'src/dtos/create-website-content.dto';
import { WebContentService } from './web-content.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/payload/ApiResponse';
import { UpdateWebContentDTO } from 'src/dtos/update-website-content.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/decorators/public.decorator';

@Controller('web-content')
@ApiTags('web-content')
export class WebContentController {
  constructor(
    @Inject(WebContentService)
    private readonly webContentService: WebContentService,
  ) {}

  @Get()
  @Public()
  async getContent() {
    return new ApiResponse(
      true,
      'Web content retrieved successfully',
      await this.webContentService.getContent(),
    );
  }
  @Post('create')
  @Public()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'abouUsImage', maxCount: 1 },
      { name: 'landingBurnerImage', maxCount: 1 },
      { name: 'innovationMainImage', maxCount: 1 },
      { name: 'newsLetterCardImage', maxCount: 1 },
      { name: 'newsLetterLargeImage', maxCount: 1 },
    ]),
  )
  async createWebContent(
    @Body() dot: CreateWebsiteContentDTO,
    @UploadedFiles()
    files: {
      abouUsImage?: Express.Multer.File[];
      landingBurnerImage?: Express.Multer.File[];
      innovationMainImage?: Express.Multer.File[];
      newsLetterCardImage?: Express.Multer.File[];
      newsLetterLargeImage?: Express.Multer.File[];
    },
  ) {
    return new ApiResponse(
      true,
      'web content created successfully',
      await this.webContentService.createWebContent(
        dot,
        files.abouUsImage,
        files.landingBurnerImage,
        files.innovationMainImage,
        files.newsLetterCardImage,
        files.newsLetterLargeImage,
      ),
    );
  }

  @Put('update')
  @Public()
  async updateWebContent(
    @Body() dto: UpdateWebContentDTO,
    @UploadedFiles()
    files: {
      abouUsImage?: Express.Multer.File[];
      landingBurnerImage?: Express.Multer.File[];
      innovationMainImage?: Express.Multer.File[];
      newsLetterCardImage?: Express.Multer.File[];
      newsLetterLargeImage?: Express.Multer.File[];
    },
  ) {
    return new ApiResponse(
      true,
      'the web content updated successfully',
      await this.webContentService.UpdateContent(
        dto,
        files.abouUsImage,
        files.landingBurnerImage,
        files.innovationMainImage,
        files.newsLetterCardImage,
        files.newsLetterLargeImage,
      ),
    );
  }
}
