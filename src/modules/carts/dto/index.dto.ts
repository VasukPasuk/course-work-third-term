import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateCartDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  user_id: number;
}

export class UpdateCartDto {
  @ApiProperty()
  @IsNumber()
  total_items: number;
}
