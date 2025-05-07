import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class StoryResponseDto {
  @Exclude()
  @IsString()
  description: string;

  @Expose()
  title: string;

  @Expose()
  author: string;
}
