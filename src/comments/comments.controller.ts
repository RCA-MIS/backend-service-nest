import { Controller , Get , Patch , Delete , Post} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from 'src/dtos/create-comment.dto';

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
    constructor(
        private commentService : CommentsService
    ) {}

    @Get('/all')
    getAllComments(){
        return this.commentService.findAll();
    }

    @Get('/:id')
    getCommentById(id : string){
        return this.commentService.findOne(parseInt(id));
    }

    @Delete('/:id')
    deleteComment(id : string){
        return this.commentService.deleteComment(parseInt(id));
    }

    @Post('/create')
    createComment(comment : CreateCommentDto){
        return this.commentService.createComment(comment);
    }

    @Patch('/update/:id')
    updateComment(id : string , comment : CreateCommentDto){
        return this.commentService.updateComment(parseInt(id) , comment);
    }

}
