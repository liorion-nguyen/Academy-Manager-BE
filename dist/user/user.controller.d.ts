/// <reference types="multer" />
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Role } from './enum/user.enum';
import { SearchUserDto } from './dto/search.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findNumber(pageOption: {
        page?: number;
        show?: number;
        search?: string;
    }): Promise<{
        data: User[];
        count: number;
    }>;
    findSearch(pageOption: {
        page?: number;
        show?: number;
        search?: string;
    }): Promise<{
        data: User[];
        count: number;
    }>;
    findById(id: string): Promise<User>;
    create(user: User, avatar: Express.Multer.File): Promise<User>;
    search(data: SearchUserDto): Promise<User[]>;
    findByRole(role: Role): Promise<User[]>;
    update(userId: string, updateUserDto: UpdateUserDto, avatar: Express.Multer.File): Promise<User>;
    delete(id: string): Promise<User>;
}
