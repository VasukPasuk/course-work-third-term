import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import {Transform} from "class-transformer";


export class BaseProductDto {
  id: number
  name: string
  discount: number
  popular: boolean
  category_name: string
  description: string
  price: number
  created_at: Date
  updated_at: Date
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  category_name: string

  @IsString()
  @Transform(({value}) => value.trim())
  @IsNotEmpty()
  name: string

  @IsString()
  description: string

  @ApiProperty()
  @Transform(({value}) => {
    return JSON.parse(value)
  })
  tags: string[]

  @IsString()
  @IsNumber()
  price: number
}


export class UpdateProductDto extends OmitType(BaseProductDto, ["created_at", "updated_at", 'id', ] as const) {}