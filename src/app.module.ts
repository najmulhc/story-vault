import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { StoryModule } from './story/story.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Story } from './story/story.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      entities: [User, Story],
      database: 'db.sqlite',
      synchronize: true,
    }),

    UserModule,
    StoryModule,
    ConfigModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
