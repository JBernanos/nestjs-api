import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class InputCreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsBoolean()
  active: boolean;
}

export class InputUpdateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;
}
