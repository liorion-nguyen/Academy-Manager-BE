import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from './enum/user.enum';
import { validate } from 'class-validator';
import { SearchUserDto } from './dto/search.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async findRole(role: Role): Promise<User[]> {
    return this.userRepository.find({ where: { role } });
  }

  async findById(id: string): Promise<User | undefined> {
    try {
      return this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new BadRequestException(`User with id ${id} not found`);

    }
  }

  async findByemail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(user: User): Promise<User> {
    let existingUser = await this.userRepository.findOne({ where: { email: user.email } });

    if (existingUser) {
      throw new BadRequestException('Account already exists');
    }
    const hash: any = await bcrypt.hash(user.password, 10);
    user.password = hash;
    return this.userRepository.save(user);
  }

  async updateUser(userId: string, updateUserDto: Partial<User>): Promise<User> {
    let user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = this.userRepository.create({
      ...user,
      ...updateUserDto,
      updatedAt: new Date(),
    }); const errors = await validate(updatedUser);

    if (errors.length > 0) {
      const errorArray = errors.map(error => ({
        property: error.property,
        constraints: error.constraints,
      }));
      throw new BadRequestException({ message: errorArray });
    }
    if (updatedUser.password) {
      const hash: any = await bcrypt.hash(updatedUser.password, 10);
      updatedUser.password = hash;
    }
    return await this.userRepository.save(updatedUser);
  }

  async searchUser(data: SearchUserDto): Promise<User[]> {
    const { gender, sortOrder } = data;
    const users = await this.userRepository.find({ where: { gender }, order: { createdAt: sortOrder } });
    return users;

  }

  async deleteUser(id: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { id } });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    try {
      await this.userRepository.remove(existingUser);
      return existingUser;
    } catch (error) {
      throw new BadRequestException('Failed to delete user');
    }
  }
  async saveTokens(id: string, accessToken: string, refreshToken: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      return this.userRepository.save(user);
    }
  }
}
