"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const message_service_1 = require("./message.service");
const message_controller_1 = require("./message.controller");
const message_entities_1 = require("./entities/message.entities");
const user_entity_1 = require("../user/entities/user.entity");
const message_respository_1 = require("./respository/message.respository");
const boxChat_entities_1 = require("../boxChat/entities/boxChat.entities");
let MessageModule = class MessageModule {
};
exports.MessageModule = MessageModule;
exports.MessageModule = MessageModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([message_entities_1.Message, user_entity_1.User, boxChat_entities_1.BoxChat, message_respository_1.MessageRepository])],
        controllers: [message_controller_1.MessageController],
        providers: [message_service_1.MessageService],
    })
], MessageModule);
//# sourceMappingURL=message.module.js.map