import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop(String)
  name: string;

  @Prop({ String, unique: true, required: true })
  email: number;

  @Prop({ String, required: true })
  password: string;

  @Prop(String)
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
