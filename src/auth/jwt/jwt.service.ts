import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as JWTService } from '@nestjs/jwt';
@Injectable()

export class JwtService {
  constructor(private readonly jwtService: JWTService, private configService: ConfigService) {}

  generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>("ACCESS_TOKEN_SECRET_KEY"),
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_LIFETIME'),
    });
  }

  generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>("REFRESH_TOKEN_SECRET_KEY"),
      expiresIn: this.configService.get<string>('REFRESH_TOKEN_LIFETIME'),
    });
  }
}
