import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class InputCreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  active: boolean;
}
