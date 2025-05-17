import { isString } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TUser } from '@/common/constants/type';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  use(req: Request & TUser, res: Response, next: NextFunction): void {
    const token: string = req.headers.authorization?.replace('Bearer ', '');

    if (isString(token)) {
      try {
        const decoded = this.jwtService.verify(token, {
          algorithms: ['HS256'],
          secret: this.configService.get<string>('JWT_TOKEN_SCRET'),
        });
        req.user = decoded; // gán user vào request
      } catch (err) {
        // không throw error, để guard xử lý sau
        req.user = null;
      }
    }
    next();
  }
}
