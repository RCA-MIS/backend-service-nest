/* eslint-disable */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleService } from './roles/role.service';
import { RoleModule } from './roles/role.module';
import { Role } from './entities/role.entity';
import { HomeController } from './home/home.controller';
import { ProjectsModule } from './project/project.module';
import { Project } from './entities/project.entity';
import { NewsModule } from './news/news.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TeachersService } from './teachers/teachers.service';
import { Student } from './entities/student.entity';
import { Teacher } from './entities/teacher.entity';
import { MailingModule } from './mailing/mailing.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UserMiddleWare } from './middlewares/user.middleware';
import { WebContentModule } from './web-content/web-content.module';
import { WebContent } from './entities/webcontent.entity';
import { News } from './entities/news.entity';
import { File } from './fileHandling/File';
import { Report } from './entities/report.enity';
import { MarksModule } from './marks/marks.module';
import { TermModule } from './term/term.module';
import { FilesModule } from './files/files.module';
import { CommentsModule } from './comments/comments.module';
import { ReportCardModule } from './report-card/report-card.module';
import { AcademicYearModule } from './academic-year/academic-year.module';
import { AcademicYear } from './entities/academic_year.entity';
import { Term } from './entities/term.entity';
import { ReportCard } from './entities/report_card.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), // Import ConfigModule here
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule here
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          User,
          Role,
          Project,
          Student,
          Teacher,
          WebContent,
          File,
          Report,
          Project,
          News,
          AcademicYear,
          Term,
          ReportCard
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      template: {
        dir: process.cwd() + '/src/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }), 
    UsersModule,
    TeachersModule,
    StudentsModule,
    RoleModule,
    ProjectsModule,
    NewsModule,
    MailingModule,
    AuthModule,
    WebContentModule,
    MarksModule,
    TermModule,
    FilesModule,
    CommentsModule,
    ReportCardModule,
    AcademicYearModule,
  ],
  controllers: [AuthController, HomeController],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly roleService: RoleService,
    private readonly teacherService: TeachersService,
  ) {}

  async onModuleInit() {
    let roles = await this.roleService.getAllRoles();
    if (!roles || roles.length == 0) {
      this.roleService.createRoles();
    }
  }
}
