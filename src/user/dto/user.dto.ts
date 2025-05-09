import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class UserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
