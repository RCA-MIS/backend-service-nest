import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from 'src/dtos/lodin.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt"
import { ApiResponse } from 'src/payload/ApiResponse';

@Controller('auth')
export class AuthController {
    constructor(
        private userService :UsersService
    ){}

    @Post("/login")
    async login(@Body() dto: LoginDTO) : Promise<ApiResponse>{
        const isUserAvailable : any =  await this.userService.getUserByEmail(dto.email);
        const arePasswordsMatch = await bcrypt.compare(dto.password.toString(), isUserAvailable.password);
       if(!arePasswordsMatch) throw new BadRequestException("Invalid email or password")
       return new ApiResponse(true, "User loggedInSucccessfully", await this.userService.login(dto));
    }
}
