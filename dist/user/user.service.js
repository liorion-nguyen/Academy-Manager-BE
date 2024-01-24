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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const class_validator_1 = require("class-validator");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll() {
        return this.userRepository.find();
    }
    async findRole(role) {
        return this.userRepository.find({ where: { role } });
    }
    async findById(id) {
        try {
            return this.userRepository.findOne({ where: { id } });
        }
        catch (error) {
            throw new common_1.BadRequestException(`User with id ${id} not found`);
        }
    }
    async findByemail(email) {
        return this.userRepository.findOne({ where: { email } });
    }
    async createUser(user) {
        let existingUser = await this.userRepository.findOne({ where: { email: user.email } });
        if (existingUser) {
            throw new common_1.BadRequestException('Account already exists');
        }
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        return this.userRepository.save(user);
    }
    async updateUser(userId, updateUserDto) {
        let user = await this.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const updatedUser = this.userRepository.create({
            ...user,
            ...updateUserDto,
            updatedAt: new Date(),
        });
        const errors = await (0, class_validator_1.validate)(updatedUser);
        if (errors.length > 0) {
            const errorArray = errors.map(error => ({
                property: error.property,
                constraints: error.constraints,
            }));
            throw new common_1.BadRequestException({ message: errorArray });
        }
        if (updatedUser.password) {
            const hash = await bcrypt.hash(updatedUser.password, 10);
            updatedUser.password = hash;
        }
        return await this.userRepository.save(updatedUser);
    }
    async deleteUser(id) {
        const existingUser = await this.userRepository.findOne({ where: { id } });
        if (!existingUser) {
            throw new common_1.NotFoundException('User not found');
        }
        try {
            await this.userRepository.remove(existingUser);
            return existingUser;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete user');
        }
    }
    async saveTokens(id, accessToken, refreshToken) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (user) {
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;
            return this.userRepository.save(user);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map