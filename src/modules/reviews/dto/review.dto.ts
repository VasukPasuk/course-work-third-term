import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateReviewDto {
  @ApiProperty({
    example: "Цей товар дуже чудовий, а ще й по низькій ціні!"
  })
  @IsString()
  @IsNotEmpty()
  text: string

  @ApiProperty({
    example: "Кітики",
    description: "Ім'я(ідентифікатор) продукту.",
  })
  @IsString()
  @IsNotEmpty()
  product_name: string
}

export class UpdateReviewDto extends CreateReviewDto {}