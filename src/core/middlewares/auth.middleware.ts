import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';
import { isString } from 'lodash';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.replace('Bearer ', '');

    if (isString(token)) {
      try {
        const decoded = this.jwtService.verify(token, { secret: 'a-string-secret-at-least-256-bits-long' });
        req['user'] = decoded; // gán user vào request
      } catch (err) {
        // không throw error, để guard xử lý sau
        req['user'] = null;
      }
    }
    next();
  }
}
