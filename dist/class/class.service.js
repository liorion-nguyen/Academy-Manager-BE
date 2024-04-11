"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_entities_1 = require("./entities/class.entities");
const user_entity_1 = require("../user/entities/user.entity");
let ClassService = class ClassService {
    constructor(classRepository, userRepository) {
        this.classRepository = classRepository;
        this.userRepository = userRepository;
    }
    async findAll() {
        return this.classRepository.find();
    }
    async findOne(id) {
        return this.classRepository.findOne({ where: { id } });
    }
    async create(item) {
        let existingClass = await this.classRepository.findOne({ where: { name: item.name } });
        if (existingClass) {
            throw new common_1.BadRequestException('Class already exists');
        }
        return this.classRepository.save(item);
    }
    async update(id, item) {
        await this.classRepository.update(id, item);
        return this.classRepository.findOne({ where: { id } });
    }
    async remove(id) {
        await this.classRepository.delete(id);
    }
    async findAllPeople(people) {
        let classes;
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
        }
        else if (people === 'student') {
            classes = await this.classRepository.find({
                select: ['id', 'name', 'course', 'students'],
            });
            for (const classData of classes) {
                const students = await this.fetchUsers(classData.students, classData.name, classData.course);
                classData.students = students;
            }
        }
        else if (people === 'teacher') {
            classes = await this.classRepository.find({
                select: ['id', 'name', 'course', 'teachers'],
            });
            for (const classData of classes) {
                const id = classData.teachers;
                const teachers = await this.userRepository.findOne({ where: { id }, select: ['id', 'fullName', 'email', 'phone', 'role', 'gender', 'address', 'avatar', 'isActive', 'createdAt', 'updatedAt'] });
                classData.teachers = teachers;
            }
        }
        else {
            throw new Error(`Invalid 'people' parameter value: ${people}`);
        }
        return classes;
    }
    async fetchUsers(userIds, name, course) {
        const users = [];
        for (const id of userIds) {
            let user = await this.userRepository.findOne({ where: { id }, select: ['id', 'fullName', 'email', 'phone', 'role', 'gender', 'address', 'avatar', 'isActive', 'createdAt', 'updatedAt'] });
            users.push(user);
        }
        return users;
    }
};
exports.ClassService = ClassService;
exports.ClassService = ClassService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(class_entities_1.Class)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ClassService);
//# sourceMappingURL=class.service.js.map