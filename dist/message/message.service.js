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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const message_entities_1 = require("./entities/message.entities");
const boxChat_entities_1 = require("../boxChat/entities/boxChat.entities");
let MessageService = class MessageService {
    constructor(userRepository, messageRepository, boxChatRepository) {
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
        this.boxChatRepository = boxChatRepository;
    }
    async getChat(boxId) {
        return this.messageRepository.find({ where: { boxId }, select: ['id', 'reply', 'emoji', 'userId', 'content', 'createdAt', 'updatedAt'] });
    }
    async createMessage(content) {
        try {
            await this.userRepository.findOne({ where: { id: content.id } });
            const boxId = content.boxId;
            return this.messageRepository.save({
                userId: content.id,
                boxId: boxId,
                reply: content.reply || null,
                content: content.content
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`User with id ${content.id} not found`);
        }
    }
    async sendChatAi(content) {
        const dataFetch = {
            contents: content.content
        };
        const url = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:streamGenerateContent";
        const headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": process.env.API_KEY_GG,
            "Connection": "keep-alive"
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(dataFetch)
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }
            const data = await response.json();
            let message = "";
            data.forEach((mess) => {
                message += mess.candidates[0].content.parts[0].text;
            });
            message = message.replace(/gemini/gi, "LiorionAi");
            message = message.replace(/google/gi, "Liorion Nguyen");
            try {
                let boxId = content.boxId;
                let boxChat;
                if (!boxId) {
                    const id = content.id;
                    const user = await this.userRepository.findOne({ where: { id }, select: ['fullName'] });
                    boxChat = await this.boxChatRepository.save({
                        name: "ChatBox Ai",
                        emotional: "👍",
                        theme: "radial-gradient(circle at center 75%, rgb(85, 208, 255) 0%, rgb(117, 151, 215) 33%, rgb(255, 159, 179) 66%, rgb(255, 159, 179) 99%)",
                        contactUser: [{
                                userId: content.id,
                                nickName: user.fullName,
                                role: "Creator"
                            }, {
                                userId: 'd6435b92-f9fe-480e-a8b6-b8cea08900ab',
                                nickName: "ChatBox Ai",
                                role: "ChatBox"
                            }]
                    });
                    boxId = boxChat.id;
                }
                await this.messageRepository.save({
                    userId: content.id,
                    boxId: boxId,
                    reply: content.reply || null,
                    content: content.content[content.content.length - 1].parts[0].text
                });
                const saveMessage = await this.messageRepository.save({
                    userId: 'd6435b92-f9fe-480e-a8b6-b8cea08900ab',
                    boxId: boxId,
                    reply: content.reply || null,
                    content: message
                });
                return {
                    boxId: boxId,
                    id: saveMessage.id,
                    content: message,
                    createAt: saveMessage.createdAt,
                    emoji: []
                };
            }
            catch (error) {
                throw new common_1.BadRequestException(`User with id ${content.id} not found`);
            }
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async deleteBox(boxId) {
        try {
            const id = boxId;
            await this.messageRepository.delete({ boxId: boxId });
            await this.boxChatRepository.delete({ id });
            return `Delete box chat ID: ${boxId} success`;
        }
        catch (error) {
            console.error('Lỗi khi xoá boxId:', error);
            throw error;
        }
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(message_entities_1.Message)),
    __param(2, (0, typeorm_2.InjectRepository)(boxChat_entities_1.BoxChat)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], MessageService);
//# sourceMappingURL=message.service.js.map