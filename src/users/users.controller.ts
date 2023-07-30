import { Controller , Param ,Delete , Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ){

    }

    @Get('/all')
    getUsers(){
     return this.usersService.getUsers();
    }

    @Get("/:id")
    async  getUserById( @Param('id') id : number ){
     const user = await this.usersService.getUserById(id);
     if(!user){
            throw new NotFoundException('User not found');
     }
     return user;
    }

    createUser(){

    }

    updateUser(){

    }

    @Delete("/;id")
    deleteUser(@Param('id') id : number){
        return this.usersService.deleteUser(id);
    }
}
