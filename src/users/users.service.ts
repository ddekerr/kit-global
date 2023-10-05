import { Body, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getUserByEMail(email: string): Promise<User> {
    const user = this.userModel.findOne({ email });
    return user;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = this.userModel.create(dto);
    return user;
  }
}
