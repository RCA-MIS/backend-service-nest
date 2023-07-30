import { IsString , IsNotEmpty } from "class-validator";
import { EGender } from "../../Enum/EGender.enum";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    email : string;
    
    @IsString()
    @IsNotEmpty()
    username : string;

    @IsString()
    @IsNotEmpty()
    gender : EGender;
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