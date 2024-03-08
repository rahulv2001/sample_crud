import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createTransport } from 'nodemailer';
import { User, UserDocument } from 'src/user.models';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  generateOTP() {
    // Declare a digits variable
    // which stores all digits
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  private readonly transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'rahulsaidupur232103@gmail.com',
      pass: 'bkyovdjojtcsfxhv',
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async sendGmail(to: string, text: string, subject: string) {
    // send mail with defined transport object
    return await this.transporter.sendMail({
      from: '"Sample_Crud App 👻" <rahulsaidupur232103@gmail.com', // sender address
      to: to,
      subject: subject,
      text: text,
    });
  }

  // creating a user
  async createUser(user: User): Promise<object> {
    const existingUser = await this.userModel.findOne({ email: user.email });
    // console.log("my query", existingUser);

    if (existingUser) {
      throw new ConflictException('User already Exist!, Please Try Again :)');
    } else {
      const newUser = new this.userModel(user);
      const varification_otp = this.generateOTP();
      console.log(varification_otp);
      newUser.otp = varification_otp;
      await this.sendGmail(
        newUser.email,
        `User Varification OTP seded successfuly!, Your OTP: ${varification_otp}`,
        'User creation',
      );
      return newUser.save();
    }
  }

  async varify_user(user: User): Promise<object> {
    const userExists = await this.userModel.findOne({ email: user.email });
    if (userExists && user.otp === userExists.otp) {
      console.log('Successfull User With OTP Varification....');
      return { message: 'Successfull Varification....' };
    } else {
      throw new BadRequestException(
        'Something went wrong!, Please try again :',
      );
    }
  }
}
