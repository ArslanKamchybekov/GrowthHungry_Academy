import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles || roles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const id = user.userId;

    try {
      const userEntity = await this.userService.get(id);

      if (!userEntity) {
        return false;
      }

      const hasRole = roles.includes(userEntity.role);
      return hasRole;
    } catch (error) {
      console.error('Error fetching user:', error);
      return false;
    }
  }
}
