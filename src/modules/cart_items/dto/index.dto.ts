import { Plastic } from 'generated/prisma';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty()
  @IsNumber()
  cart_id: number;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  color_name: string;

  @ApiProperty()
  plastic: Plastic;
}

export class UpdateCartItemDto extends OmitType(CreateCartItemDto, [
  'cart_id',
] as const) {}
