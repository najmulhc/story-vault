import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StoryModule } from './story/story.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Story } from './story/story.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      entities: [User, Story],
      database: 'db.sqlite',
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Story]),
    UserModule,
    StoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
