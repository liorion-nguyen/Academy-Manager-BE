import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async createUser(user: User): Promise<User> {
    let existingUser = await this.userRepository.findOne({ where: { username: user.username } });

    if (existingUser) {
      throw new BadRequestException('Account already exists');
    }
    const hash: any = await bcrypt.hash(user.password, 10);
    user.password = hash;
    return this.userRepository.save(user);
  }

  async updateUser(user: User): Promise<User> {
    let existingUser = await this.findById(user.id);

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    try {
      const hash: any = await bcrypt.hash(user.password, 10);
      user.password = hash;
      await this.userRepository.save(user);
      return this.userRepository.findOne({ where: { id: user.id } });
    } catch (error) {
      throw new BadRequestException('Failed to update user');
    }
  }

  async deleteUser(id: number): Promise<User> {
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
  async saveTokens(id: number, accessToken: string, refreshToken: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      return this.userRepository.save(user);
    }
  }
}
