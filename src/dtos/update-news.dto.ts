/* eslint-disable */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateNewsDto{
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title : string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty()
    description : string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @IsOptional()
    @ApiProperty()
    userEmail : string;

}