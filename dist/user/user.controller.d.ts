import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Role } from './enum/user.enum';
import { SearchUserDto } from './dto/search.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    create(user: User): Promise<User>;
    search(data: SearchUserDto): Promise<User[]>;
    findByRole(role: Role): Promise<User[]>;
    update(userId: string, updateUserDto: Partial<User>): Promise<User>;
    delete(id: string): Promise<User>;
}
