import { UserService } from './user.service';
import { User } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    update(user: User): Promise<User>;
    create(user: User): Promise<User>;
    delete(id: number): Promise<User>;
}
