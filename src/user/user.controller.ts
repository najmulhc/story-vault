import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Response, Request } from 'express';
import { AuthGuard } from './guards/auth.guard';

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

  // we want a new set of tokens
  @Get('/refresh-tokens')
  async refreshTokens(
    @Req() req: Request,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    const refresher = req.cookies['refresh-token'];
    const { accessToken, refreshToken } =
      await this.userService.refreshTokens(refresher);

    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return {
      accessToken,
    };
  }

  // we want to log out of the site
  @Post('/log-out')
  logOut(
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    res.clearCookie('refresh-token');
    return {
      success: true,
    };
  }

  @UseGuards(AuthGuard)
  @Get('/test')
  returnSomething() {
    return 'shob thik ase';
  }
}
