import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: '',
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
