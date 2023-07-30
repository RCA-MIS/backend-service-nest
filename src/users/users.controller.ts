import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ){

    }


    getUsers(){

    }

    getUserById(){

    }

    createUser(){

    }

    updateUser(){

    }

    deleteUser(){

    }
}
