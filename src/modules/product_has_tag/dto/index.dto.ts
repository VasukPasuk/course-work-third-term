import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class BaseProdAndTagDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  product_name: string;

  @ApiProperty()
  tag_name: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;
}

export class UnpinDto extends PickType(BaseProdAndTagDto, [
  'tag_name',
  'product_name',
] as const) {}

export class AttachDto extends PickType(BaseProdAndTagDto, [
  'tag_name',
  'product_name',
] as const) {}
