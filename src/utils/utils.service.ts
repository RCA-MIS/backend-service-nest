import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import * as  bcrypt from "bcrypt"

@Injectable()
export class UtilsService {
    constructor( private config: ConfigService,  private  jwt:JwtService )  {} 

    async getTokens(user: User) : Promise<{accessToken: String, refreshToken:String}>{
        const accessToken : String = await this.jwt.signAsync({roles:user.role, id:user.id, national_id:user.national_id}, {
            expiresIn:"10m",
            secret:this.config.get('SECRETE_KEY')
        });
        const refreshToken  : String= await this.jwt.signAsync({roles:user.role, id:user.id, national_id:user.national_id}, {
            expiresIn:"1d",
            secret:this.config.get('SECRETE_KEY')
        });

        return {
            accessToken:accessToken.toString(),refreshToken:refreshToken.toString()
        }

    }

    async hashString(input) {
        try {
            if (typeof input !== 'string') {
                throw new Error('Input must be a string');
            }
            const hash = await bcrypt.hash(input, 10);
            return hash;
        } catch (error) {
            console.error('Error occurred while hashing:', error.message);
        }
    }
    
    }
