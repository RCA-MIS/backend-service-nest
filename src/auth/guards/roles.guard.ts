import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/entities/role.entity";
import { KEY_ROLES } from "../../utils/decorators/roles.decorator";
import { ERole } from "src/Enum/ERole.enum";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(
        public reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService : ConfigService
    ){}
  async canActivate(context : ExecutionContext) : Promise<boolean>{
        const requiredRoles = this.reflector.getAll<ERole[]>(KEY_ROLES, [
            context.getHandler,
            context.getClass()
        ]);
        if(!requiredRoles) return true;
        const { user } = context.switchToHttp().getRequest();
        // console.log(context.switchToHttp().getRequest())
        // user.role.map((userRole: Role) => {
        //      if(requiredRoles.some((requestRole) => userRole.role_name == ERole[requestRole])) return true;
        // })
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);
    if (!token) {
      throw new UnauthorizedException('Authorization token is required');
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.configService.get('SECRET_KEY'),
      );
      console.log(payload)
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    return true;
  }

  private getToken(request: any) {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}