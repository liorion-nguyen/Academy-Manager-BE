"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxChatModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const boxChat_service_1 = require("./boxChat.service");
const boxChat_controller_1 = require("./boxChat.controller");
const boxChat_entities_1 = require("./entities/boxChat.entities");
const user_entity_1 = require("../user/entities/user.entity");
const boxChat_respository_1 = require("./respository/boxChat.respository");
let BoxChatModule = class BoxChatModule {
};
exports.BoxChatModule = BoxChatModule;
exports.BoxChatModule = BoxChatModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([boxChat_entities_1.BoxChat, user_entity_1.User, boxChat_respository_1.BoxChatRepository])],
        controllers: [boxChat_controller_1.BoxChatController],
        providers: [boxChat_service_1.BoxChatService],
    })
], BoxChatModule);
//# sourceMappingURL=boxChat.module.js.map