import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from './enum/user.enum';
import { validate } from 'class-validator';
import { SearchUserDto } from './dto/search.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly filebaseService: FirebaseService
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

  async createUser(user: User, file: Express.Multer.File){
    let existingUser = await this.userRepository.findOne({ where: { email: user.email } });

    if (existingUser) {
      throw new BadRequestException('Account already exists');
    }
    if(file){
      const avatarUrl = await this.filebaseService.UploadImage(file);
      user.avatar = avatarUrl;
    }
    const hash: any = await bcrypt.hash(user.password, 10);
    user.password = hash;
    return this.userRepository.save(user);
  }

  async updateUser(userId: string, updateUserDto: Partial<User>, avatar: Express.Multer.File): Promise<User> {
    let user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if(avatar){
      try {
        user.avatar  && await this.filebaseService.DeleteImage(user.avatar);
        
      } catch (error) {
        console.log(error)
      }
      const avatarUrl = await this.filebaseService.UploadImage(avatar);
      user.avatar = avatarUrl;
    }else{
      delete updateUserDto.avatar;
    }

    
    if (updateUserDto.password) {
      const hash: any = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hash;
    }
    console.log(updateUserDto)
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
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
