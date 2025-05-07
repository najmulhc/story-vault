import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class ChangePasswordDto {
  @IsString()
  password: string;

  @IsString()
  @IsStrongPassword()
  newPassword: string

  @IsEmail()
  email: string
}
