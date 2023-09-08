import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { User } from './schemas/users.schema';
import { InputCreateUserDto, InputUpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  private async emailInUse(email): Promise<boolean> {
    const document = await this.userModel.findOne({ email: email });
    return document ? true : false;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find({});
    if (users.length > 0) return users;
    else throw new NotFoundException('Users collection is empty.');
  }

  async getUserByEmail(userEmail: string): Promise<User> {
    const user = await this.userModel.findOne({ email: userEmail });
    if (user) return user;
    else throw new NotFoundException('User not found.');
  }

  async createUser(payload: InputCreateUserDto): Promise<void> {
    if (!(await this.emailInUse(payload.email))) await this.userModel.create(payload);
    else throw new BadRequestException('E-mail already in use.');
  }

  async updateUser(payload: InputUpdateUserDto): Promise<void> {
    const userDocument = await this.userModel.findOne({ email: payload.email });
    if (userDocument) {
      const fields = Object.keys(userDocument.schema.obj);
      fields.map((field) => {
        if (field in payload && field != 'email') userDocument[field] = payload[field];
      });
      await this.userModel.updateOne({ email: payload.email }, userDocument);
    } else throw new NotFoundException('User not found in database.');
  }

  async deleteUser(userEmail: string): Promise<void> {
    const { deletedCount } = await this.userModel.deleteOne({ email: userEmail });
    if (deletedCount == 0) throw new BadRequestException('User not found in database.');
  }
}
