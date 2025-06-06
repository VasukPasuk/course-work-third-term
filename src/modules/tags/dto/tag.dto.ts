import {IsNotEmpty, IsOptional, IsString, MinLength} from "class-validator";
import { PartialType } from '@nestjs/mapped-types';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @IsOptional()
  description?: string
}

export class UpdateTagDto extends PartialType(CreateTagDto) {}