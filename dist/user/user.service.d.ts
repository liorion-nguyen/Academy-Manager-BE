import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './enum/user.enum';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findRole(role: Role): Promise<User[]>;
    findById(id: string): Promise<User | undefined>;
    findByemail(email: string): Promise<User | undefined>;
    createUser(user: User): Promise<User>;
    updateUser(userId: string, updateUserDto: Partial<User>): Promise<User>;
    deleteUser(id: string): Promise<User>;
    saveTokens(id: string, accessToken: string, refreshToken: string): Promise<User>;
}
