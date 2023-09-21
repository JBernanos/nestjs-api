import { IsString, IsNumber, IsArray } from 'class-validator';

export class InputCreateOrderDto {
  @IsString()
  user_email: string;

  @IsArray()
  @IsString({ each: true })
  products: string[];

  @IsNumber()
  total_price: number;

  @IsNumber()
  discount: number;
}
