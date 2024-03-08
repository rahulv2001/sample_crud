import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
// import { Column, Table } from "sequelize-typescript";

export type UserDocument = HydratedDocument<User>;

@Schema() // decorator
export class User{
    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    description: string;

    @Prop()
    otp: string;
    
    @Prop({defaultValue: Date.now})
    date_added: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);