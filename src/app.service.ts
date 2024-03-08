import { BadRequestException, Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  // creating a user
  // async createUser(user: User): Promise<object> {

  //   let existingUser = await this.userModel.findOne({email: user.email});

  //   console.log("my query", existingUser);

  //   if(existingUser){
  //       console.log("User email already exists!");
  //       const response = {
  //         data: existingUser,
  //         message: "User already Exist"
  //       }
  //       return response;
  //   }else{
  //       const newUser = new this.userModel(user);
  //       return newUser.save();
  //   }
  // }

  // reading a user from collection
  async readUser() {
    return this.userModel
      .find({})
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }

  //updating the user data
  async updateUser(id, data): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, data, { new: true });
  }

  // deleting the user data/ user
  async deleteUser(id): Promise<object> {
    const userExist = await this.userModel.findById(id);
    console.log('My deleting User: ', userExist);
    if (!userExist) {
      // throw new ConflictException('This user does not exist!');
      throw new BadRequestException('This user does not exist!');
    } else {
      // this.userModel.findByIdAndDelete(id);
      return this.userModel.findByIdAndDelete(id);
    }
    // return this.userModel.findByIdAndDelete(id);
  }
}
