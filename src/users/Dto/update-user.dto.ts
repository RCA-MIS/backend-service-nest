/* eslint-disable */ 
import { EGender } from "../../Enum/EGender.enum";
import { IsString , IsOptional, IsEnum  } from "class-validator";

export class UpdateUserDto{
    @IsString()
    @IsOptional()
    email : string;

    @IsString()
    @IsOptional()
    username : string;

    @IsString()
    @IsOptional()
    @IsEnum(EGender)
    gender : EGender;

    @IsString()
    @IsOptional()
    nationalId : string;

    @IsString()
    @IsOptional()
    phonenumber : string;
}