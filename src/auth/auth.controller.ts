import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from 'src/dtos/lodin.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt"
import { ApiResponse } from 'src/payload/ApiResponse';
import { VerifyAccountDTO } from 'src/dtos/verifyAccount.dto';
import { User } from 'src/entities/user.entity';
import { ResetPasswordDTO } from 'src/dtos/resetPassword.dto';

@Controller('auth')
export class AuthController {
    public isUserAvailable :User;
    constructor(
        private userService :UsersService
    ){}

    @Post("/login")
    async login(@Body() dto: LoginDTO) : Promise<ApiResponse>{
         this.isUserAvailable  =  await this.userService.getUserByEmail(dto.email);
        const arePasswordsMatch = await bcrypt.compare(dto.password.toString(), this.isUserAvailable.password);
       if(!arePasswordsMatch) throw new BadRequestException("Invalid email or password")
       return new ApiResponse(true, "User loggedInSucccessfully", await this.userService.login(dto));
    }
    @Post("verify_account")
    async VerifyAccount(@Body() dto: VerifyAccountDTO) : Promise<ApiResponse>{
         this.isUserAvailable = await this.userService.getUserByEmail(dto.email);
         if(this.isUserAvailable.activationCode != dto.verificationCode) throw new BadRequestException("The provided verification code is invalid");
         return new ApiResponse(true, "Your account is verified successfully", await this.userService.verifyAccount(dto.email))
    }

    @Post('reset_password')
    async resetPassword(@Body() dto:ResetPasswordDTO) : Promise<ApiResponse>{
        return new ApiResponse(true, "Your account was rest successfully ", await this.userService.resetPassword(dto.email, dto.activationCode, dto.newPassword))
        
    }
}
