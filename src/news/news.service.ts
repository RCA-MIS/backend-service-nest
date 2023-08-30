/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNewsDto } from 'src/dtos/create-news.dto';
import { News } from 'src/entities/news.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private newsRepo: Repository<News>,
    private userService: UsersService,
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

  async createNews(project: CreateNewsDto) {
    const { title, description, userEmail } = project;
    const writer = await this.userService.getUserByEmail(userEmail);
    if (!writer)
      return new NotFoundException(`User with email: ${userEmail} not found`);
    const createdAt = new Date(Date.now());
    const updatedAt = null;
    const likes = 0;
    const newsEntity = this.newsRepo.create({
      title,
      description,
      writer,
      likes,
      createdAt,
      updatedAt,
    });
    await this.newsRepo.save(project);
    return {
      message: 'News created successfully',
      data: newsEntity,
    };
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
