import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | undefined>;
    findByemail(email: string): Promise<User | undefined>;
    createUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User>;
    deleteUser(id: string): Promise<User>;
    saveTokens(id: string, accessToken: string, refreshToken: string): Promise<User>;
}
