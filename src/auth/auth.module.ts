import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UtilsModule } from 'src/utils/utils.module';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule , ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UtilsModule ,  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('SECRET_KEY'),
      signOptions: {
        expiresIn: '1d',
      },
    }),
    inject: [ConfigService],
  }),],
  controllers: [AuthController],
  providers: [AuthService , AuthGuard , {
provide : 'APP_GUARD',
useClass : AuthGuard
  }],
  exports: [AuthService],
})
export class AuthModule {}
