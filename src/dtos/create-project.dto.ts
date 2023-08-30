/* eslint-disable */ 
import { IsEmail, IsEnum, IsNotEmpty, IsString, Max } from "class-validator";
import { EProjectStatus } from "src/Enum/EProjectStatus.enum";
export class CreateProjectDto{
     @IsNotEmpty()
     @IsString({message: 'Title must be a string'})
     @Max(20)
     name: string;

     @IsNotEmpty()
     @IsString()
     description: string;

     @IsNotEmpty()
     @IsEnum(EProjectStatus)
     status: string;

     @IsNotEmpty()
     @IsEmail()
     @IsString()
     userEmail: string;

}