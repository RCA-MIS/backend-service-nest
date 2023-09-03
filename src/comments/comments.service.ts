import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from 'src/entities/comments.entity';
import { CreateCommentDto } from 'src/dtos/create-comment.dto';
import { UsersService } from 'src/users/users.service';
import { NewsService } from 'src/news/news.service';
import { ProjectService } from 'src/project/project.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UpdateCommentDto } from 'src/dtos/update-comment.dto';


@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comments) private commentRepository: Repository<Comments>,
        private userService : UsersService,
        private newsService : NewsService,
        private projectService : ProjectService
    ) {}

    async findAll(): Promise<Comments[]> { 
        return await this.commentRepository.find();
    }
    

    async findOne(id: number) {
        return await this.commentRepository.findOne({
            where : {
                id : id
            }
        });
    }

    async deleteComment(id : number){
        const comment = await this.commentRepository.findOne({
            where : {
                id : id
            }
        });
        await this.commentRepository.remove(comment);
        return {
            message : "Comment deleted successfully"
        }
    }

    async createComment(comment : CreateCommentDto){
        const {content , user_email , news_id , project_id} = comment;
        const user = await this.userService.getUserByEmail(user_email);
        if(!user) return new NotFoundException(`User with email: ${user_email} not found`);
        const createdAt = new Date(Date.now())
        const updatedAt = null;
        const likes = 0;
        const writer = user;
        let news , project;
        if(news_id){
         news = await this.newsService.getNewsById(parseInt(news_id));
         project = null;
        }
        if(project_id){
         project = await this.projectService.getProjectById(parseInt(project_id));
         news = null;
        }

        if(!news && !project) return new NotFoundException('News or Project is needed to create a comment');
        const commentEntity = this.commentRepository.create({
            content,
            likes,
            writer,
            news,
            project,
            createdAt,
            updatedAt,
        })
        await this.commentRepository.save(commentEntity);
        return {
            message : "Comment created successfully",
            data : commentEntity
        }
    }


    async updateComment(id : number , comment : UpdateCommentDto){
        const {content} = comment;
        const commentEntity = await this.commentRepository.findOne({
            where : {
                id : id
            }
        });
        if(commentEntity){
            commentEntity.content = content;
            await this.commentRepository.save(commentEntity);
            return {
                message : "Comment updated successfully"
            }
        }
        return new NotFoundException("Comment not found");
    }

}

