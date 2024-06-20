// user.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Role } from './enum/user.enum';
import { SearchUserDto } from './dto/search.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get("/page")
  async findNumber( @Query() pageOption: {
    page?: number,
    show?: number,
    search?: string,
  }): Promise<{ data: User[], count: number }> {
    return this.userService.findNumber(pageOption);
  }

  @Get("/search")
  async findSearch( @Query() pageOption: {
    page?: number,
    show?: number,
    search?: string,
  }): Promise<{ data: User[], count: number }> {
    return this.userService.findSearch(pageOption);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async create(
    @Body() user:User,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    try {
      if (user.id) {
        throw new BadRequestException('No user ID is required!');
      }
      return this.userService.createUser(user, avatar);
    } catch (error) {
      console.error('Validation Error:', error);

    if (error instanceof BadRequestException) {
      throw error; 
    }

    throw new BadRequestException('Invalid user data', error.message);
    }
  }

  @Post('/search')
  async search(@Body() data: SearchUserDto): Promise<User[]> {
    return this.userService.searchUser(data);
  }

  @Get('/roles/:role')
  async findByRole(@Param('role') role: Role): Promise<User[]> {
    return this.userService.findRole(role);
  }
  
  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  async update(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<User> {
    return this.userService.updateUser(userId, updateUserDto,avatar);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
