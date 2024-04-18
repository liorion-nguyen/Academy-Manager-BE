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
exports.BoxChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const boxChat_entities_1 = require("./entities/boxChat.entities");
let BoxChatService = class BoxChatService {
    constructor(userRepository, boxChatRepository) {
        this.userRepository = userRepository;
        this.boxChatRepository = boxChatRepository;
    }
    async getBoxChat(userId) {
        const datas = await this.boxChatRepository.find();
        let result = [];
        datas.map((data) => {
            let check = false;
            data.contactUser.map((item) => {
                if (userId === item.userId) {
                    check = true;
                }
            });
            if (check) {
                result.push(data);
            }
        });
        return result;
    }
    async getInformationUser(id) {
        return this.userRepository.findOne({ where: { id }, select: ['id', 'avatar', 'fullName'] });
    }
    async getBoxIdWithUser(id1, id2) {
        try {
            const data = await this.boxChatRepository.find();
            for (const boxChat of data) {
                const contactUserIds = boxChat.contactUser.map(user => user.userId);
                if (contactUserIds.length === 2 && contactUserIds.includes(id1) && contactUserIds.includes(id2)) {
                    return boxChat.id;
                }
            }
            return this.createBoxChat({
                "userId": [
                    id1,
                    id2
                ]
            });
        }
        catch (error) {
            console.error("Error finding box chat with users:", error);
            return new Error("Internal server error");
        }
    }
    async createBoxChat(data) {
        try {
            const contactUser = data.userId;
            if (contactUser.length <= 1) {
                return new common_1.BadRequestException("Error create Box Chat: number people join not full");
            }
            else {
                let boxName = "";
                let informationUser = [];
                for (const id of contactUser) {
                    const user = await this.userRepository.findOne({ where: { id }, select: ['fullName'] });
                    if (user) {
                        const { fullName } = user;
                        boxName += `${fullName.split(' ').slice(1).join(' ')}, `;
                        informationUser.push({
                            userId: id,
                            nickName: fullName,
                            role: informationUser.length === 0 ? "Creator" : "Member"
                        });
                    }
                    else {
                        console.warn("User with ID", id, "not found while creating box chat");
                    }
                }
                return this.boxChatRepository.save({
                    name: boxName,
                    emotional: "👍",
                    theme: "radial-gradient(circle at center 75%, rgb(85, 208, 255) 0%, rgb(117, 151, 215) 33%, rgb(255, 159, 179) 66%, rgb(255, 159, 179) 99%)",
                    contactUser: informationUser
                });
            }
        }
        catch (error) {
            console.error('Error create Box Chat boxId:', error);
            throw error;
        }
    }
};
exports.BoxChatService = BoxChatService;
exports.BoxChatService = BoxChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(boxChat_entities_1.BoxChat)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], BoxChatService);
//# sourceMappingURL=boxChat.service.js.map