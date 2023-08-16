/* eslint-disable */ 
import { IsString , IsNotEmpty, IsEnum, IsEmail, IsStrongPassword } from "class-validator";
import { EGender } from "../Enum/EGender.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email : string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username : string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(EGender)
    @ApiProperty()
    myGender : EGender;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    registercode : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    national_id : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    phonenumber : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @IsStrongPassword()
    password : string;
}