import { ApiProperty } from '@nestjs/swagger';
import { IsString , IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    content: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    user_email: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    news_id: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    project_id: string;
}