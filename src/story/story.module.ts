import { Module } from '@nestjs/common';
import { StoryController } from './story.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { StoryService } from './story.service';

@Module({
  controllers: [StoryController], 
  providers: [JwtService, AuthGuard, StoryService], 
  imports: [JwtModule.register({
    secret: ''
  })]
})
export class StoryModule {}
