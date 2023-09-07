import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';
import { InputCreateUserDto, InputUpdateUserDto } from './dto/users.dto';

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

  @Put()
  async updateUser(@Body() payload: InputUpdateUserDto): Promise<void> {
    return this.usersService.updateUser(payload);
  }
}
