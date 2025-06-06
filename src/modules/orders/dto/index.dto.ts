import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  region: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  locality: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  comment: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  EDRPOY_CODE: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  legal_entity: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  street: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  floor: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  house: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  appartment: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  delivery_type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  payment_type: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  department_address: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  total_price: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  total_items: number;

  @IsArray()
  @ArrayMinSize(1)
  items: {
    colorName: string;
    productName: string;
    plastic: 'PLA' | 'CoPET';
    amount: number;
    price: number;
  }[];
}
