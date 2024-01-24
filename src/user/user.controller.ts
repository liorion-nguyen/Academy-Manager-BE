// user.controller.ts
import { Controller, Get, Post, Body, Param, BadRequestException, ValidationPipe, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Role } from './enum/user.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Post()
  async create(@Body(new ValidationPipe()) user: User): Promise<User> {
    if (user.id) {
      throw new BadRequestException("No user ID is required!");
    }
    return this.userService.createUser(user);
  }

  @Get('/roles/:role')
  async findByRole(@Param('role') role: Role): Promise<User[]> {
    return this.userService.findRole(role);
  }
  @Put(":id")
  async update(@Param('id') userId: string, @Body() updateUserDto: Partial<User>): Promise<User> {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }

}
