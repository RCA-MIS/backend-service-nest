/* eslint-disable */
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateNewsDto{
    @IsNotEmpty()
    @IsString()
    title : string;

    @IsNotEmpty()
    @IsString()
    description : string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    userEmail : string;

}