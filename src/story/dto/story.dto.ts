import { IsString } from 'class-validator';

export class StroyDto {
  @IsString()
  author: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
