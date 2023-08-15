import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    @Post("/login")
    login() : any{
       return "Hello this is the login page"
    }
}
