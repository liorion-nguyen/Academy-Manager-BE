import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Class } from "./entities/class.entities";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class ClassService {
    constructor(
        @InjectRepository(Class)
        private readonly classRepository: Repository<Class>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<Class[]> {
        return this.classRepository.find();
    }

    async findOne(id: string): Promise<Class | undefined> {
        return this.classRepository.findOne({ where: { id } });
    }

    async create(item: Class) {
        let existingClass = await this.classRepository.findOne({ where: { name: item.name } });
        if (existingClass) {
            throw new BadRequestException('Class already exists');
        }
        return this.classRepository.save(item);
    }

    async update(id: string, item: Partial<Class>): Promise<Class | undefined> {
        await this.classRepository.update(id, item);
        return this.classRepository.findOne({ where: { id } });
    }

    async remove(id: string): Promise<void> {
        await this.classRepository.delete(id);
    }

    async findAllPeople(people: string): Promise<any[]> {
        let classes: any[];

        if (people === 'all') {
            classes = await this.classRepository.find({
                select: ['id', 'name', 'course', 'teachers', 'students'],
            });

            for (const classData of classes) {
                const id = classData.teachers;
                const teachers = await this.userRepository.findOne({ where: { id }, select: ['id', 'fullName', 'email', 'phone', 'role', 'gender', 'address', 'avatar', 'isActive', 'createdAt', 'updatedAt'] });
                const students = await this.fetchUsers(classData.students, classData.name, classData.course);

                classData.teachers = teachers;
                classData.students = students;
            }
        } else if (people === 'student') {
            classes = await this.classRepository.find({
                select: ['id', 'name', 'course', 'students'],
            });

            for (const classData of classes) {
                const students = await this.fetchUsers(classData.students, classData.name, classData.course);
                classData.students = students;
            }
        } else if (people === 'teacher') {
            classes = await this.classRepository.find({
                select: ['id', 'name', 'course', 'teachers'],
            });
            for (const classData of classes) {
                const id = classData.teachers;
                const teachers = await this.userRepository.findOne({ where: { id }, select: ['id', 'fullName', 'email', 'phone', 'role', 'gender', 'address', 'avatar', 'isActive', 'createdAt', 'updatedAt'] });
                classData.teachers = teachers;
            }
        } else {
            throw new Error(`Invalid 'people' parameter value: ${people}`);
        }
        return classes;
    }

    private async fetchUsers(userIds: string[], name: string, course: string): Promise<User[]> {
        const users: User[] = [];
        for (const id of userIds) {
            let user = await this.userRepository.findOne({ where: { id }, select: ['id', 'fullName', 'email', 'phone', 'role', 'gender', 'address', 'avatar', 'isActive', 'createdAt', 'updatedAt'] });
            users.push(user);
        }
        return users;
    }
}