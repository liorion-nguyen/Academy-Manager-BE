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
exports.BoxChatController = void 0;
const common_1 = require("@nestjs/common");
const boxChat_service_1 = require("./boxChat.service");
let BoxChatController = class BoxChatController {
    constructor(boxChatService) {
        this.boxChatService = boxChatService;
    }
    async getBoxChat(id) {
        return this.boxChatService.getBoxChat(id);
    }
    async getInformationUser(id) {
        return this.boxChatService.getInformationUser(id);
    }
    async getBoxIdWithUser(id1, id2) {
        return this.boxChatService.getBoxIdWithUser(id1, id2);
    }
    async createBoxChat(content) {
        return this.boxChatService.createBoxChat(content);
    }
};
exports.BoxChatController = BoxChatController;
__decorate([
    (0, common_1.Get)('/user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoxChatController.prototype, "getBoxChat", null);
__decorate([
    (0, common_1.Get)('/informationUser/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoxChatController.prototype, "getInformationUser", null);
__decorate([
    (0, common_1.Get)('/checkBox'),
    __param(0, (0, common_1.Query)('id1')),
    __param(1, (0, common_1.Query)('id2')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BoxChatController.prototype, "getBoxIdWithUser", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BoxChatController.prototype, "createBoxChat", null);
exports.BoxChatController = BoxChatController = __decorate([
    (0, common_1.Controller)('BoxChat'),
    __metadata("design:paramtypes", [boxChat_service_1.BoxChatService])
], BoxChatController);
//# sourceMappingURL=boxChat.controller.js.map