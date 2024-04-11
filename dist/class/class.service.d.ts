import { Repository } from "typeorm";
import { Class } from "./entities/class.entities";
import { User } from "src/user/entities/user.entity";
export declare class ClassService {
    private readonly classRepository;
    private readonly userRepository;
    constructor(classRepository: Repository<Class>, userRepository: Repository<User>);
    findAll(): Promise<Class[]>;
    findOne(id: string): Promise<Class | undefined>;
    create(item: Class): Promise<Class>;
    update(id: string, item: Partial<Class>): Promise<Class | undefined>;
    remove(id: string): Promise<void>;
    findAllPeople(people: string): Promise<any[]>;
    private fetchUsers;
}
