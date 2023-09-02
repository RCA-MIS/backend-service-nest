import { IsString , IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCommentDto {
    @IsOptional()
    @IsString()
    content: string;
}