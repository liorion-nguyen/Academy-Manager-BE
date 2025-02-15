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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnMessage = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let ReturnMessage = class ReturnMessage {
};
exports.ReturnMessage = ReturnMessage;
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReturnMessage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReturnMessage.prototype, "boxId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReturnMessage.prototype, "reply", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ReturnMessage.prototype, "emoji", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb"),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], ReturnMessage.prototype, "content", void 0);
exports.ReturnMessage = ReturnMessage = __decorate([
    (0, typeorm_1.Entity)()
], ReturnMessage);
//# sourceMappingURL=returnMess.entities.js.map