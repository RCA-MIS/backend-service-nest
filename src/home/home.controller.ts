/* eslint-disable */ 
import { Controller , Get } from '@nestjs/common';

@Controller('')
export class HomeController {
    @Get('/')
    getHello(): string {
        return 'RCA BACKEND API ARE ONLINE';
    }
}
