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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("./entities/notification.entity");
const user_entity_1 = require("../user/entities/user.entity");
let NotificationService = class NotificationService {
    constructor(notificationRepository, userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }
    async findAll() {
        return this.notificationRepository.find();
    }
    async findOne(id) {
        return this.notificationRepository.findOne({ where: { id } });
    }
    async create(notification) {
        try {
            await this.userRepository.findOne({ where: { id: notification.userId } });
            const newNotification = this.notificationRepository.create(notification);
            return this.notificationRepository.save(newNotification);
        }
        catch (error) {
            throw new common_1.BadRequestException(`User with id ${notification.userId} not found`);
        }
    }
    async update(id, notification) {
        await this.notificationRepository.update(id, notification);
        return this.notificationRepository.findOne({ where: { id } });
    }
    async remove(id) {
        await this.notificationRepository.delete(id);
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], NotificationService);
//# sourceMappingURL=notification.service.js.map