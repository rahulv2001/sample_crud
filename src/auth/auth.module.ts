import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user.models';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rahulv2001:rahulv2001@blogapp.ahu2ucc.mongodb.net/?retryWrites=true&w=majority&appName=BlogApp',
    ),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
