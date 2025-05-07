import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Response, Request } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AdminDto } from './dto/admin.dto';

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
    console.log({
   accessToken, refreshToken
 })
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
  @Patch('/be-admin')
  async beAdmin(
    @Body() body: AdminDto,
    @Req() req: Request,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    const { key } = body;
    if (key != 'a7f3d9b21c8e45f0') {
      throw new UnauthorizedException('Invalid key given');
    }
    const oldRefreshToken = req.cookies['refresh-token'];

    const { accessToken, refreshToken } = await this.userService.beAdmin(oldRefreshToken);

     res.cookie('refresh-token', refreshToken, {
       httpOnly: true,
       secure: true,
     });
     return {
       accessToken,
     };
  }
  @UseGuards(AuthGuard, new RoleGuard('admin'))
  @Get('/test')
  returnSomething() {
    return 'shob thik ase';
  }
}
