import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop(String)
  name: string;

  @Prop({ String, unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop(String)
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
