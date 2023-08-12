/* eslint-disable */ 
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule , ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { RoleService } from './role/role.service';
import { OnModuleInit } from '@nestjs/common/interfaces';
import { RoleModule } from './role/role.module';
import { Role } from './entities/role.entity';
import { log } from 'console';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User , Role],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule, 
    TeachersModule,
    StudentsModule,
    RoleModule,
   ],



})
export class AppModule implements OnModuleInit {
  constructor(private readonly roleService : RoleService){}

  async onModuleInit(){
    const roles = await this.roleService.getAllRoles();
    log(roles)
    if(!roles || roles.length == 0){
      this.roleService.createRoles();
    }
  }
}
