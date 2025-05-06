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
    // if the role is asking admin, we will not let pass the user to go
    // if the role is asking user, anyone can go
    const request = context.switchToHttp().getRequest();
      const { user } = request;
  console.log(user);
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
