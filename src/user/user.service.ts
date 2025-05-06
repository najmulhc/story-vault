import { JsonWebTokenError } from './../../node_modules/@types/jsonwebtoken/index.d';
import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private jwt: JwtService,
    @InjectRepository(User) private repository: Repository<User>,
  ) {}

  async generateTokens(payload: {
    email: string;
    id: number;
    role: 'user' | 'admin';
  }) {
    const accessToken = await this.jwt.sign(payload, {
      secret: 'ditesi opekkha koren',
      expiresIn: '15m',
    });

    const refreshToken = await this.jwt.sign(payload, {
      secret: 'koisina na opkkha korte?',
      expiresIn: '15d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  async signUp(payload: UserDto) {
    const { email, password } = payload;
    // find if there is any existing user or not,
    const existedUser = await this.repository.findOneBy({ email });
    if (existedUser) {
      throw new UnauthorizedException(
        'We already have an user with this email!',
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = 'user';
    const createdUser = this.repository.create({
      email,
      hashedPassword,
      role,
    });

    await this.repository.save(createdUser);

    const { accessToken, refreshToken } = await this.generateTokens({
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async login(payload: UserDto) {
    const { email, password } = payload;

    const user = await this.repository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const correctPassword = await bcrypt.compare(password, user.hashedPassword);
    if (!correctPassword) {
      throw new UnauthorizedException('Incorrect password!');
    }

    const { accessToken, refreshToken } = await this.generateTokens({
      email: user.email,
      role: user.role,
      id: user.id,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refresher: string) {
    if (!refresher) {
      throw new UnauthorizedException('No refresh token given');
    }

    try {
      const decoded = await this.jwt.verifyAsync(refresher, {
        secret: 'koisina na opkkha korte?',
      });
      const { accessToken, refreshToken } = await this.generateTokens({
        email: decoded.email,
        id: decoded.id,
        role: decoded.id,
      });
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
