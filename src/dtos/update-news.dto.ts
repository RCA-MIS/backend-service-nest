/* eslint-disable */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNewsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  shortDescription: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  longDescription: string;
}
