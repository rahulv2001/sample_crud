import { Body, Controller, HttpStatus, Post, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user.models';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/users')
  async createUser(@Body() user: User, @Response() expressRes: any) {
    try {
      const res = await this.authService.createUser(user);

      console.log('User Created Successfully! ;)');
      return expressRes.status(HttpStatus.OK).send({
        message: 'user created successfully!',
        data: res,
        error: false,
      });
    } catch (err) {
      console.error(`Error while creating user!, err: ${err}`);
      return expressRes.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Error while creating user!',
        error: true,
      });
    }
  }

  @Post('/users/varify')
  async varify_user(@Body() user: User, @Response() expressRes: any) {
    try {
      await this.authService.varify_user(user);
      console.log('User Varified Successfully!');
      return expressRes
        .status(HttpStatus.OK)
        .send({ message: 'Varification done successful', error: false });
    } catch (err) {
      console.error(`Error while varifying the user!, err: ${err}`);
      return expressRes.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Error while varifying the user!',
        error: true,
      });
    }
  }
}
