import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Response,
  Get,
} from '@nestjs/common';
import { AuthService, UserPayload } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../../modules/users/dto/user.dto';
import { Cookies } from '../../common/decorators/cookie.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt.auth.guard';
import { Request, Response as RESPONSE } from 'express';
import { User } from '../../common/decorators/user.decorator';
import { LocalAuthGuard } from '../../common/guards/local.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Response({ passthrough: true }) response: RESPONSE,
  ) {
    const { access_token, refresh_token, ...user } =
      await this.authService.login(loginUserDto);
    response.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return { access_token, user: { ...user } };
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  test(@User() user: UserPayload) {
    return user
  }

  @Post('register')
  async register(@Body() registerUserDto: CreateUserDto) {
    return this.authService.register(registerUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Response({ passthrough: true }) response: RESPONSE) {
    return response.clearCookie('refreshToken');
  }

  @Post('refresh')
  async refresh(@Cookies('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('activate')
  async activate(@User() user: UserPayload) {
    return this.authService.activate(user);
  }
}
