import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';
import { InputCreateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/all')
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get('/email/:email')
  async getUserByEmail(@Param('email') userEmail: string): Promise<User> {
    return this.usersService.getUserByEmail(userEmail);
  }

  @Post('')
  async createUser(@Body() payload: InputCreateUserDto): Promise<void> {
    return this.usersService.createUser(payload);
  }
}
