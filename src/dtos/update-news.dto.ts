/* eslint-disable */
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateNewsDto{
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title : string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    description : string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @IsOptional()
    userEmail : string;

}