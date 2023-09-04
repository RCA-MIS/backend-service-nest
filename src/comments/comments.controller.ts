import { Controller , Get , Patch , Delete , Post} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from 'src/dtos/create-comment.dto';
import { UpdateCommentDto } from 'src/dtos/update-comment.dto';

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
    @ApiBody({type : CreateCommentDto})
    createComment(comment : CreateCommentDto){
        return this.commentService.createComment(comment);
    }

    @Patch('/update/:id')
    @ApiBody({type : UpdateCommentDto})
    updateComment(id : string , comment : UpdateCommentDto){
        return this.commentService.updateComment(parseInt(id) , comment);
    }

}
