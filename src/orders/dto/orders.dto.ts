import { IsString, IsNumber, IsArray } from 'class-validator';

export class InputCreateOrderDto {
  @IsString()
  user_id: string;

  @IsArray()
  @IsString({ each: true })
  products: string[];

  @IsNumber()
  price: number;

  @IsNumber()
  discount: number;
}
