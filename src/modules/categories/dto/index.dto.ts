import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class BaseCategoryDto {
  id: number
  name: string
  description: string
  created_at: Date
  updated_at: Date
}

export class CreateCategoryDto {
  @ApiProperty({
    description: "Category name text.",
  })
  @IsString()
  name: string


  @ApiProperty({
    description: "Category description text.",
  })
  @IsString()
  description: string
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}