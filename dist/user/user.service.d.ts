/// <reference types="multer" />
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './enum/user.enum';
import { SearchUserDto } from './dto/search.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
export declare class UserService {
    private readonly userRepository;
    private readonly filebaseService;
    constructor(userRepository: Repository<User>, filebaseService: FirebaseService);
    findAll(): Promise<User[]>;
    findRole(role: Role): Promise<User[]>;
    findById(id: string): Promise<User | undefined>;
    findByemail(email: string): Promise<User | undefined>;
    createUser(user: User, file: Express.Multer.File): Promise<User>;
    updateUser(userId: string, updateUserDto: Partial<User>, avatar: Express.Multer.File): Promise<User>;
    searchUser(data: SearchUserDto): Promise<User[]>;
    deleteUser(id: string): Promise<User>;
    saveTokens(id: string, accessToken: string, refreshToken: string): Promise<User>;
}
