"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const user_entity_1 = require("./user/entities/user.entity");
const auth_module_1 = require("./auth/auth.module");
const dotenv = require("dotenv");
const jwt_1 = require("@nestjs/jwt");
const notification_module_1 = require("./notification/notification.module");
const notification_entity_1 = require("./notification/entities/notification.entity");
const firebase_module_1 = require("./firebase/firebase.module");
const class_module_1 = require("./class/class.module");
const class_entities_1 = require("./class/entities/class.entities");
const message_module_1 = require("./message/message.module");
const message_entities_1 = require("./message/entities/message.entities");
const boxChat_entities_1 = require("./boxChat/entities/boxChat.entities");
const boxChat_module_1 = require("./boxChat/boxChat.module");
const confirm_module_1 = require("./confirm/confirm.module");
const confirm_etities_1 = require("./confirm/entities/confirm.etities");
dotenv.config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DATABASE_URL,
                synchronize: true,
                entities: [user_entity_1.User, notification_entity_1.Notification, class_entities_1.Class, message_entities_1.Message, boxChat_entities_1.BoxChat, confirm_etities_1.Confirm],
            }),
            user_module_1.UserModule,
            class_module_1.ClassModule,
            auth_module_1.AuthModule,
            message_module_1.MessageModule,
            boxChat_module_1.BoxChatModule,
            firebase_module_1.FirebaseModule,
            notification_module_1.NotificationModule,
            confirm_module_1.ConfirmModule,
            jwt_1.JwtModule.register({
                secret: 'liorion',
                signOptions: { expiresIn: '60s' },
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map