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
  UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NewsService } from './news.service';
import { NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from 'src/dtos/create-news.dto';
import { UpdateNewsDto } from 'src/dtos/update-news.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private newService: NewsService) {}

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
  @UseInterceptors(FileInterceptor('image'))
  createProject(@Body() news: CreateNewsDto , @UploadedFile() file: Express.Multer.File) {
    return this.newService.createNews(news , file);
  }

  @Patch('/update/:id')
  updateProject(@Param('id') id: string, @Body() news: UpdateNewsDto) {
    return this.newService.updateNews(parseInt(id), news);
  }

  @Patch('/update/image/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateProjectImage(@Param('id') id : string , @UploadedFile() file: Express.Multer.File) {
    return this.newService.updateNewsImage(parseInt(id) , file);
  }

  @Patch('/like/:id')
  likeProject(@Param('id') id: string) {
    return this.newService.likeNews(parseInt(id));
  }

  @Delete('/delete/:id')
  deleteProject(@Param('id') id: string) {
    return this.newService.deleteNews(parseInt(id));
  }
}
