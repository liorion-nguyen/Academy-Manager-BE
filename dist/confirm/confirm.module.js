"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const user_module_1 = require("../user/user.module");
const confirm_controller_1 = require("./confirm.controller");
const confirm_service_1 = require("./confirm.service");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const confirm_etities_1 = require("./entities/confirm.etities");
const confirm_repository_1 = require("./repository/confirm.repository");
let ConfirmModule = class ConfirmModule {
};
exports.ConfirmModule = ConfirmModule;
exports.ConfirmModule = ConfirmModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([confirm_etities_1.Confirm, confirm_repository_1.ConfirmRepository, user_entity_1.User]),
            schedule_1.ScheduleModule.forRoot(),
            user_module_1.UserModule,
        ],
        controllers: [confirm_controller_1.ConfirmController],
        providers: [confirm_service_1.ConfirmService]
    })
], ConfirmModule);
//# sourceMappingURL=confirm.module.js.map