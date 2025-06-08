import { Prisma } from 'generated/prisma/client';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: CreateUserDto,
    example: {
      name: 'anonimous2000',
      first_surname: 'Vasia',
      second_surname: 'Pashkivskij',
      email: 'vasik-pasik@gmail.com',
      login: 'vasukpasuk',
      password: 'qwerty123321',
    },
  })
  @MinLength(1, {
    message: 'Мінімальне значення для поля name становить 1 символ.'
  })
  @IsString()
  name: string;

  @MinLength(1, {
    message: 'Мінімальне значення для поля first_surname становить 1 символ.'
  })
  @IsString()
  first_surname: string;

  @MinLength(1, {
    message: 'Мінімальне значення для поля second_surname становить 1 символ.'
  })
  @IsString()
  second_surname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'Мінімальне значення для поля login становить 6 символів.'
  })
  @IsString()
  login: string;

  @MinLength(8, {
    message: 'Мінімальне значення для поля password становить 8 символів.'
  })
  @IsString()
  password: string;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'login',
  'password',
]) {}
