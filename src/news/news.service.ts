/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNewsDto } from 'src/dtos/create-news.dto';
import { News } from 'src/entities/news.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';
import { FilesService } from 'src/files/files.service';
import { Express, Request } from 'express';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private newsRepo: Repository<News>,
    private userService: UsersService,
    private fileService: FilesService,
    private utilsService: UtilsService,
  ) {}

  async getAllNews() {
    return await this.newsRepo.find();
  }

  async getNewsById(id: number) {
    return await this.newsRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  async createNews(
    news: CreateNewsDto,
    files: Express.Multer.File[],
    req: Request,
  ) {
    const { title, shortDescription, longDescription } = news;
    const writer = await this.utilsService.getLoggedInProfile(req);

    let likes = 0;
    let imageUpload: Express.Multer.File;
    let attachmentUpload: Express.Multer.File;

    files.forEach((file) => {
      if (file.fieldname === 'image') {
        imageUpload = file;
      }
      if (file.fieldname === 'attachment') {
        attachmentUpload = file;
      }
    });

    try {
      const image = await this.fileService.uploadFile(imageUpload);
      if (!image || image == null || image == undefined)
        return new NotFoundException('Image not found ');
      let attachementFile: string;
      if (
        !attachmentUpload ||
        attachmentUpload == null ||
        attachmentUpload == undefined
      ) {
        attachementFile = null;
      } else {
        attachementFile = await this.fileService.uploadFile(attachmentUpload);
      }
      const newToCreate = new News(
        title,
        shortDescription,
        longDescription,
        image,
        attachementFile,
      );
      const createdNew = await this.newsRepo.save(newToCreate);
      return {
        message: 'News created successfully',
        data: createdNew,
      };
    } catch (error) {
      console.log(error);
      return {
        message: 'News creation Failed!',
      };
    }
  }

  async updateNews(id: number, attrs: Partial<News>) {
    const news = await this.newsRepo.findOne({
      where: {
        id: id,
      },
    });
    if (news) {
      Object.assign(news, attrs);
      await this.newsRepo.save(news);
      return {
        message: 'News updated successfully',
      };
    }
    return new NotFoundException('News not found');
  }

  async updateNewsImage(id: number, file: Express.Multer.File) {
    const news = await this.newsRepo.findOne({
      where: {
        id: id,
      },
    });
    if (news) {
      const image = await this.fileService.updateFile(news.image, file);
      news.image = image;
      await this.newsRepo.save(news);
      return {
        message: 'News image updated successfully',
      };
    }
    return new NotFoundException('News not found');
  }

  async deleteNews(id: number) {
    const news = await this.newsRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!news) {
      return new NotFoundException('News not found');
    }

    this.newsRepo.remove(news);
    return {
      message: 'News deleted successfully',
    };
  }

  likeNews(id: number) {
    return this.newsRepo.increment({ id: id }, 'likes', 1);
  }
}
