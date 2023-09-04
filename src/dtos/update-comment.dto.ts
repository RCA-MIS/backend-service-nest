import { ApiProperty } from '@nestjs/swagger';
import { IsString , IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCommentDto {
    @IsOptional()
    @IsString()
    @ApiProperty()
    content: string;
}