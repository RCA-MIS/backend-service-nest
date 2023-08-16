/* eslint-disable */ 
import { IsEmail, IsNotEmpty, IsOptional, IsString, Max , IsEnum } from "class-validator";
import { EProjectStatus } from "../Enum/EProjectStatus.enum";

export class UpdateProjectDto{
    @IsOptional()
    @IsNotEmpty()
    @IsString({message: 'Title must be a string'})
    @Max(20)
     name: string;

     @IsOptional()
     @IsNotEmpty()
     @IsString()
     description: string;

     @IsNotEmpty()
     @IsOptional()
     @IsEnum(EProjectStatus)
     status: string;

     @IsOptional()
     @IsNotEmpty()
     @IsEmail()
     @IsString()
     userEmail: string;

}