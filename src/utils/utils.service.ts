import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UtilsService {
    constructor( private config: ConfigService,  private  jwt:JwtService )  {} 

    async getTokens(user: User) : Promise<{accessToken: String, refreshToken:String}>{
        const accessToken : String = await this.jwt.signAsync(user, {
            expiresIn:"10m",
            secret:this.config.get('SECRETE_KEY')
        });
        const refreshToken  : String= await this.jwt.signAsync(user, {
            expiresIn:"1d",
            secret:this.config.get('SECRETE_KEY')
        });

        return {
            accessToken:accessToken.toString(),refreshToken:refreshToken.toString()
        }

    }
}
