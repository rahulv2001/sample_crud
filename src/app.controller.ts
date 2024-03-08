import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Response,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.models';
import { UserUpdateDto } from './userUpdate.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Post()
  // async createUser(@Body() user: User) {
  //   return this.appService.createUser(user);
  // }

  @Get()
  readUser() {
    return this.appService.readUser();
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: UserUpdateDto,
  ): Promise<User> {
    return this.appService.updateUser(id, updateData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Response() expressRes: any) {
    try {
        await this.appService.deleteUser(id);
        console.log("User Deleted Successfully!");
        return expressRes.status(HttpStatus.OK).send({ message:"User Deleted Successfylly!", error: false });
    } catch (err) {
        console.error(`Something went wrong while deleting the user!, err: ${err}`);
        return expressRes.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message:"Error while deleting user!", error: true});
    }
    // return this.appService.deleteUser(id);
  }
}

// @Delete(':id')
// async deleteUser(@Param('id') id: string, @Response() expressRes: any): Promise<User> {
//   try {
//       this.appService.deleteUser(id);
//       console.log("User Deleted Successfully!");
//       return expressRes.status(HttpStatus.OK).send({message:"User Deleted Successfylly!", error: false});
//   } catch (err) {
//       console.error(`Something went wrong while deleting the user!, err: ${err}`);
//       return expressRes.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message:"Error while deleting user!", error: true});
//   }
//   // return this.appService.deleteUser(id);
// }
// }
