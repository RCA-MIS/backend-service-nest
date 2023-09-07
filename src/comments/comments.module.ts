import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comments } from 'src/entities/comments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { NewsModule } from 'src/news/news.module';
import { ProjectsModule } from 'src/project/project.module';


@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [TypeOrmModule.forFeature([Comments]) , UsersModule , NewsModule , ProjectsModule],
})
export class CommentsModule {}
