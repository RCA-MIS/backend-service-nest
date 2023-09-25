import {
  ExecutionContext,
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserMiddleWare implements NestMiddleware {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(UsersService) private readonly userService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    if (
      req.baseUrl == '' ||
      req.baseUrl == '/favicon.ico' ||
      req.baseUrl == '/auth/login' ||
      req.baseUrl == '/api' ||
      req.baseUrl == 'auth/verify_account' ||
      req.baseUrl == '/api/swagger-docs.html' ||
      req.baseUrl == '/users/create' ||
      req.baseUrl == '/auth/verify_account' ||
      req.baseUrl == '/auth/reset_password' ||
      req.baseUrl == '/news/all' ||
      req.baseUrl == '/projects/all' ||
      req.baseUrl == '/web-content' ||
      req.baseUrl == '/web-content/create' ||
      req.baseUrl == '/web-content/update' ||
      req.baseUrl == '/comments/all' ||
      req.baseUrl == '/' ||
      req.baseUrl == '/comments/:id' ||
      req.baseUrl == '/files' ||
      req.baseUrl == '/projects/:id' ||
      req.baseUrl == '/news/:id' ||
      req.baseUrl == '/news/*'
    ) {
      next();
    } else {
      if (authorization) {
        const token = authorization.split(' ')[1];
        if (!authorization.toString().startsWith('Bearer '))
          throw new UnauthorizedException('The provided token is invalid');
        let user;
        try {
          const payload = this.jwtService.verify(token, {
            secret: this.configService.get('SECRET_KEY'),
          });
          user = await this.userService.getUserById(payload.id, 'User');
          req['user'] = user;
        } catch (error) {
          if (error.name === 'TokenExpiredError') {
            throw new BadRequestException('Token has expired');
          } else {
            throw new UnauthorizedException('Token is invalid');
          }
        }

        next();
      } else {
        console.log(req.baseUrl);
        throw new UnauthorizedException(
          'Please you are not authorized to access resource',
        );
      }
    }
  }
}
