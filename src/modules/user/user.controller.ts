import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Write route find projects

  @Get(':id')
  async getUserProjects(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUserProjects(id);
  }
}
