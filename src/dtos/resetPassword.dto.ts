import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator";

export class ResetPasswordDTO{
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email:String;

    @IsString()
    @IsStrongPassword()
    @IsNotEmpty()
    @ApiProperty()
    newPassword:String;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    activationCode:number
}