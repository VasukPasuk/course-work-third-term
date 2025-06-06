import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UsersService } from '../../modules/users/users.service';
import { CreateUserDto, LoginUserDto } from '../../modules/users/dto/user.dto';
import { JwtService } from '../jwt/jwt.service';
import { JwtService as JWTService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

export type UserPayload = {
  id: number;
  login: string;
  role: string;
};

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private JwtService: JWTService,
  ) {}

  async register(userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  async login(loginUserDto: LoginUserDto) {
    const isUserExist = await this.validateUser(
      loginUserDto.login,
      loginUserDto.password,
    );

    if (!isUserExist) {
      throw new BadRequestException('User already exists');
    }

    const payload: UserPayload = {
      id: isUserExist.id,
      login: loginUserDto.login,
      role: isUserExist.role,
    };

    return {
      access_token: this.jwtService.generateAccessToken(payload),
      refresh_token: this.jwtService.generateRefreshToken(payload),
      ...payload,
    };
  }

  async refresh(refreshToken: string) {
    try {
      const data = await this.JwtService.verifyAsync<UserPayload>(
        refreshToken,
        {
          secret: this.configService.get<string>('REFRESH_TOKEN_SECRET_KEY'),
        },
      );
      const newPayload = { role: data.role, id: data.id, login: data.login };
      return this.jwtService.generateAccessToken(newPayload);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async activate(user: UserPayload) {
    const searchedUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    });
    if (searchedUser?.activated) {
      throw new BadRequestException('User already activated');
    }

    return this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        activated: true,
      },
    });
  }

  async validateUser(login: string, password: string) {
    const user = await this.usersService.findUserByLogin(login);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
