import { Prisma } from 'generated/prisma/client';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @MinLength(1)
  @IsString()
  name: string;

  @MinLength(1)
  @IsString()
  first_surname: string;

  @MinLength(1)
  @IsString()
  second_surname: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  @IsString()
  login: string;

  @MinLength(8)
  @IsString()
  password: string;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'login',
  'password',
]) {}
