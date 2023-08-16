/* eslint-disable */ 
import { Controller , Param ,Delete , Get, Body , Post , Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { ERole } from 'src/Enum/ERole.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';


@ApiTags("users")
@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
    constructor(
        private usersService: UsersService
    ){

    }

    @Get('/all')
    @Roles(ERole.STUDENT)
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
    createAdminAccount(@Body() body : CreateUserDto){
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
