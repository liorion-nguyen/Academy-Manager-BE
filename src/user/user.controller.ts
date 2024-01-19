// user.controller.ts
import { Controller, Get, Post, Body, Param, BadRequestException, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(parseInt(id));
  }

  @Post()
  async update(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }
  @Post("/update")
  async create(@Body(new ValidationPipe()) user: User): Promise<User> {
    if (!user.id) {
      throw new BadRequestException('ID is required for user update.');
    }
    return this.userService.updateUser(user);
  }

  @Post("/delete")
  async delete(@Body("id") id: number): Promise<User> {
    if (!id) {
      throw new BadRequestException('ID is required for user delete.');
    }
    return this.userService.deleteUser(id);
  }

}
