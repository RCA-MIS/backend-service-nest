/* eslint-disable */
import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { LoginDTO } from 'src/dtos/lodin.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { ApiResponse } from 'src/payload/ApiResponse';
import { VerifyAccountDTO } from 'src/dtos/verify-account.dto';
import { User } from 'src/entities/user.entity';
import { ResetPasswordDTO } from 'src/dtos/reset-password.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  public isUserAvailable: User;
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post('/login')
  async login(@Body() dto: LoginDTO): Promise<ApiResponse> {
    this.isUserAvailable = await this.userService.getOneByEmail(dto.email);
    if (!this.isUserAvailable)
      throw new ForbiddenException('Invalid email or password');
    const arePasswordsMatch = await bcrypt.compare(
      dto.password.toString(),
      this.isUserAvailable.password.toString(),
    );
    if (!arePasswordsMatch)
      throw new BadRequestException('Invalid email or password');
    return new ApiResponse(
      true,
      'User loggedInSucccessfully',
      await this.userService.login(dto),
    );
  }
  @Post('verify_account')
  async VerifyAccount(@Body() dto: VerifyAccountDTO): Promise<ApiResponse> {
    this.isUserAvailable = await this.userService.getUserByEmail(dto.email);
    if (this.isUserAvailable.activationCode != dto.verificationCode)
      throw new BadRequestException(
        'The provided verification code is invalid',
      );
    return new ApiResponse(
      true,
      'Your account is verified successfully',
      await this.userService.verifyAccount(dto.email),
    );
  }

  @Post('reset_password')
  async resetPassword(@Body() dto: ResetPasswordDTO): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'Your account was rest successfully ',
      await this.userService.resetPassword(
        dto.email,
        dto.activationCode,
        dto.newPassword,
      ),
    );
  }
  @Get('/get-profile')
  async getProfile(@Req() req: Request) {
    let profile = await this.authService.getProfile(req);
    return profile;
  }
}
