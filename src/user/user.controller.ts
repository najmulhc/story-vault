import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/sign-up')
  async singUp(
    @Body() body: UserDto,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    const { accessToken, refreshToken } = await this.userService.signUp(body);

    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return {
      accessToken,
    };
  }

  @Post('/login')
  async login(
    @Body() body: UserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.userService.login(body);

    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return {
      accessToken,
    };
  }
}
