import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UsersModule } from '../../modules/users/users.module';
import { JwtModule } from '../jwt/jwt.module';
import { JwtService as JWTService, JwtModule as JWTModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../common/strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from '../../common/strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule,
    JWTModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_SECRET_KEY'), // Secret key
        signOptions: { expiresIn: configService.get<string>('ACCESS_TOKEN_LIFETIME') }, // Time limit
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JWTService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
