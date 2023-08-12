/* eslint-disable */ 
import { IsString , IsNotEmpty, IsEnum } from "class-validator";
import { EGender } from "../Enum/EGender.enum";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    email : string;
    
    @IsString()
    @IsNotEmpty()
    username : string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(EGender)
    myGender : EGender;

    @IsString()
    @IsNotEmpty()
    registercode : string;

    @IsString()
    @IsNotEmpty()
    national_id : string;

    @IsString()
    @IsNotEmpty()
    phonenumber : string;

    @IsString()
    @IsNotEmpty()
    password : string;
}