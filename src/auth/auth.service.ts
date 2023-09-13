import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class AuthService {
  constructor(private utilsService: UtilsService) {}
  async getProfile(req: Request, res: Response) {
    try {
      return await this.utilsService.getLoggedInProfile(req, res);
    } catch (error) {
      return error;
    }
  }
}
