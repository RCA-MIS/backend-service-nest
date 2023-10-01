/* eslint-disable */
import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  Post,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { NewsService } from './news.service';
import { NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from 'src/dtos/create-news.dto';
import { UpdateNewsDto } from 'src/dtos/update-news.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Request } from 'express';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private newService: NewsService) {}

  @Public()
  @Get('/all')
  getAllNews() {
    return this.newService.getAllNews();
  }

  @Get('/:id')
  async getProjectById(@Param('id') id: string) {
    const news = await this.newService.getNewsById(parseInt(id));
    if (!news) return new NotFoundException('News Not Found');
    return news;
  }

  @Post('/create')
  @Roles('ADMIN', 'PUBLISHER')
  @ApiBody({ type: CreateNewsDto })
  @UseInterceptors(AnyFilesInterceptor())
  async createProject(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() news: CreateNewsDto,
    @Req() req: Request,
  ) {
    return this.newService.createNews(news, files, req);
  }

  @Patch('/update/:id')
  @Roles('ADMIN', 'PUBLISHER')
  @ApiBody({ type: UpdateNewsDto })
  updateProject(@Param('id') id: string, @Body() news: UpdateNewsDto) {
    return this.newService.updateNews(parseInt(id), news);
  }

  @Patch('/update/image/:id')
  @UseInterceptors(FileInterceptor('image'))
  @Roles('ADMIN', 'PUBLISHER')
  updateProjectImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.newService.updateNewsImage(parseInt(id), file);
  }

  @Patch('/like/:id')
  @Roles('ADMIN', 'PUBLISHER')
  likeProject(@Param('id') id: string) {
    return this.newService.likeNews(parseInt(id));
  }

  @Delete('/delete/:id')
  @Roles('ADMIN', 'PUBLISHER')
  deleteProject(@Param('id') id: string) {
    return this.newService.deleteNews(parseInt(id));
  }
}
