import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
          id: id,
      }  });
  }

  async createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
  async updateUser(user: User): Promise<User> {
    try {
      await this.userRepository.update(user.id, {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        password: user.password,
      });
  
      const updatedUser = await this.userRepository.findOne({
        where: {
          id: user.id,
        }  });
  
      if (!updatedUser) {
        throw new Error('User not found after update'); 
      }
  
      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
   
  }
  async deleteUser(id: number) :Promise<User> {
    try {
      const updatedUser = await this.userRepository.findOne({
        where: {
          id: id,
        }  });
      await this.userRepository.delete({id: id});
      return updatedUser;
      
    } catch (error) {
      throw new Error(error)
    }
  }

}
