import { Module } from '@nestjs/common';
import { StoryController } from './story.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { StoryService } from './story.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './story.entity';
import {  SerializeInterceptor } from './interceptors/story.interceptor';

@Module({
  controllers: [StoryController],
  providers: [JwtService, AuthGuard, StoryService ],
  imports: [
    JwtModule.register({
      secret: '',
    }),  TypeOrmModule.forFeature([Story])
  ],
})
export class StoryModule {}
