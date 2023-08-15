import { Module, OnModuleInit } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleService } from './roles/role.service';
import { RoleModule } from './roles/role.module';
import { Role } from './entities/role.entity';
import { log } from 'console';
import { AppController } from './app/app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigService
import { Teacher } from './entities/teacher.entity';
import { Student } from './entities/student.entity';
import { Report } from './entities/report.enity';
import { AuthModule } from './auth/auth.module';
import { TeachersService } from './teachers/teachers.service';
import { UtilsModule } from './utils/utils.module';
import { JwtModule } from '@nestjs/jwt';
import { StudentsService } from './students/students.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Import ConfigModule here
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule here
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Role, Teacher, Student, Report],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    TeachersModule,
    StudentsModule,
    RoleModule,
    AuthModule,
    UtilsModule,
    JwtModule
  ],
  controllers: [AppController],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly roleService: RoleService, private readonly teacherService: TeachersService) {}

  async onModuleInit() {
    const roles = await this.roleService.getAllRoles();
    if (!roles || roles.length == 0) {
      this.roleService.createRoles();
    }
  }
}
