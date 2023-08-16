import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginDTO{
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email : String;

    @IsStrongPassword()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: String
}