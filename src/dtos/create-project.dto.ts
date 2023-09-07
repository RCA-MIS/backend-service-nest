/* eslint-disable */ 
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, Max } from "class-validator";
import { EProjectStatus } from "src/Enum/EProjectStatus.enum";
export class CreateProjectDto{
     @IsNotEmpty()
     @IsString({message: 'Title must be a string'})
     @Max(20)
     @ApiProperty()
     name: string;

     @IsNotEmpty()
     @IsString()
     @ApiProperty()
     description: string;

     @IsNotEmpty()
     @IsEnum(EProjectStatus)
     @ApiProperty()
     status: string;

     @IsNotEmpty()
     @IsEmail()
     @IsString()
     @ApiProperty()
     userEmail: string;

}