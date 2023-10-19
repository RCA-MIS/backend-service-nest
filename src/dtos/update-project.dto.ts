/* eslint-disable */ 
import { IsEmail, IsNotEmpty, IsOptional, IsString, Max , IsEnum } from "class-validator";
import { EProjectStatus } from "../Enum/EProjectStatus.enum";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProjectDto{
    @IsOptional()
    @IsNotEmpty()
    @IsString({message: 'Title must be a string'})
    @Max(20)
    @ApiProperty()
     name: string;

     @IsOptional()
     @IsNotEmpty()
     @IsString()
     @ApiProperty()
     description: string;

     @IsNotEmpty()
     @IsOptional()
     @IsString({message: 'Status must be REJECETED ,PENDING or APPROVED '})
     @ApiProperty()
     status: string;

     @IsOptional()
     @IsNotEmpty()
     @IsEmail()
     @IsString()
     @ApiProperty()
     userEmail: string;

}