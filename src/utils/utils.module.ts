import { Module, forwardRef } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [forwardRef(() => UsersModule), JwtModule, ConfigModule],
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
