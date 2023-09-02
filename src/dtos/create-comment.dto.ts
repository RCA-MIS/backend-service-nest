import { IsString , IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsString()
    user_id: string;

    @IsOptional()
    @IsString()
    news_id: string;

    @IsNotEmpty()
    @IsString()
    project_id: string;
}