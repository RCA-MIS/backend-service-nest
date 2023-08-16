/* eslint-disable */ 
import { Controller , Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Home')
@Controller('')
export class HomeController {
    @Get('/')
    getHello(): string {
        return 'RCA BACKEND API ARE ONLINE';
    }
}
