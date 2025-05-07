import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    console.log(authHeader);
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }
    const token = authHeader.split(' ')[1];
    console.log(token);
    if (!token) {
      throw new UnauthorizedException(
        'Token is missing in the authorization header',
      );
    }
    try {
      const payload = await this.jwt.verifyAsync(token , {
        secret: 'ditesi opekkha koren',
      });

      if (!payload) {
        throw new UnauthorizedException('Invalid token');
      }
      console.log(payload)
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
