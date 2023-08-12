/* eslint-disable */ 
import { Controller , Param ,Delete , Get, Body , Post , Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';


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

    @Post('/create')
    createUser(@Body() body : CreateUserDto){
       return this.usersService.createUser(body);
    }

    @Patch("/:id")
    updateUser(@Param('id') id : number , @Body() body : UpdateUserDto){
     return this.usersService.updateUser(id , body);
    }

    @Delete("/;id")
deleteUser(@Param('id') id:number){
        return this.usersService.deleteUser(id);
    }
}
