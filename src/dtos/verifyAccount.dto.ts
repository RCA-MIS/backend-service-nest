import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class VerifyAccountDTO{
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email:String;

    // @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    verificationCode:number;
}