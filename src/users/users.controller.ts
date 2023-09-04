import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/all')
  async listAllUsers(): Promise<User[]> {
    return this.usersService.listAllUsers();
  }

  @Get('/id/:id')
  async getUserById(@Param('id') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }
}
