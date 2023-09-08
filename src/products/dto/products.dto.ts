import { IsString, IsNumber, IsOptional } from 'class-validator';

export class InputCreateProductDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  price: string;
}

export class InputUpdateProductDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  price: string;
}
