import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { User } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async listAllUsers(): Promise<User[]> {
    const users = await this.userModel.find({});
    if (users.length > 0) return users;
    else throw new NotFoundException('Users collection is empty.');
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findOne({ id: userId });
    if (user) return user;
    else throw new NotFoundException('User not found.');
  }
}
