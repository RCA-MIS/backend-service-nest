import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'RCA SMIS BACKEND APPLICATION IS ONLINE';
  }
}
