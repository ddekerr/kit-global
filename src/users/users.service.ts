import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserByEMail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async createUser(dto: User): Promise<User> {
    console.log(dto);
    const user = await this.userModel.create(dto);
    return user;
  }

  async removeToken(email: string): Promise<void> {
    await this.userModel.findOneAndUpdate({ email }, { token: null });
  }

  async addToken(email: string, token: string): Promise<void> {
    await this.userModel.findOneAndUpdate({ email }, { token });
  }
}
