import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtModule as JWTModule } from '@nestjs/jwt';

@Module({
  imports: [JWTModule],
  providers: [JwtService],
  exports: [JwtService]
})
export class JwtModule {}
