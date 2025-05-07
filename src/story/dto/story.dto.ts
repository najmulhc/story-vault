import { IsString } from 'class-validator';

export class StoryDto {
  @IsString()
  author: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
