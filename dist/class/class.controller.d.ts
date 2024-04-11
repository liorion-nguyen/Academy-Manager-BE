import { ClassService } from "./class.service";
import { Class } from "./entities/class.entities";
export declare class ClassController {
    private readonly classService;
    constructor(classService: ClassService);
    findAllPeople(people: string): Promise<any[]>;
    findAll(): Promise<Class[]>;
    findOne(id: string): Promise<Class | undefined>;
    create(item: Class): Promise<Class>;
    update(id: string, item: Partial<Class>): Promise<Class | undefined>;
    remove(id: string): Promise<void>;
}
