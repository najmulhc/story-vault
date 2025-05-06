import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  role: 'user' | 'admin';
  constructor(userRole: 'user' | 'admin') {
    this.role = userRole;
  }
  canActivate(context: ExecutionContext): any {
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if (user.role == this.role) {
      return true;
    }

    if (this.role == 'admin' && user.role != this.role) {
      throw new UnauthorizedException('You do not have permission to admin');
    } else {
      return true;
    }
  }
}
