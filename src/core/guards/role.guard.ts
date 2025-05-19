import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ROLE } from '@/common/constants/enum';
import { Roles } from '@/common/decorators/roles.decorator';
import { TUser } from '@/common/constants/type';
import { Request } from 'express';

/**
 * Guard kiểm tra quyền truy cập của người dùng dựa trên role.
 *
 * - Sử dụng Reflector để lấy metadata `Roles` đã được gán bằng custom decorator `@Roles()`.
 * - Lấy thông tin user từ request (đã được middleware attach sau khi decode token).
 * - Nếu role của user nằm trong danh sách role được phép (acceptRoles), cho phép truy cập route.
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const acceptRoles: ROLE[] = this.reflector.get(Roles, context.getHandler());
    const request: Request & TUser = context.switchToHttp().getRequest();
    const user = request.user;

    return user && acceptRoles.includes(user.role);
  }
}
