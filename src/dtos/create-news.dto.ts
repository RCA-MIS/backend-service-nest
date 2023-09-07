/* eslint-disable */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateNewsDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description : string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    userEmail : string;

}