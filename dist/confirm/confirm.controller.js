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
exports.ConfirmController = void 0;
const common_1 = require("@nestjs/common");
const confirm_service_1 = require("./confirm.service");
const user_entity_1 = require("../user/entities/user.entity");
let ConfirmController = class ConfirmController {
    constructor(confirmService) {
        this.confirmService = confirmService;
    }
    async sendCode(user) {
        return this.confirmService.sendCode(user);
    }
    async confirmCode(user, code) {
        return this.confirmService.confirmCode(user, code);
    }
};
exports.ConfirmController = ConfirmController;
__decorate([
    (0, common_1.Post)('email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ConfirmController.prototype, "sendCode", null);
__decorate([
    (0, common_1.Post)('code/:code'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", Promise)
], ConfirmController.prototype, "confirmCode", null);
exports.ConfirmController = ConfirmController = __decorate([
    (0, common_1.Controller)('confirm'),
    __metadata("design:paramtypes", [confirm_service_1.ConfirmService])
], ConfirmController);
//# sourceMappingURL=confirm.controller.js.map