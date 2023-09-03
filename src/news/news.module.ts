/* eslint-disable */
import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/entities/news.entity';
import { UsersModule } from 'src/users/users.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [NewsController],
  imports: [TypeOrmModule.forFeature([News]), UsersModule , FilesModule],
  providers: [NewsService],
  exports : [NewsService]
})
export class NewsModule {}
