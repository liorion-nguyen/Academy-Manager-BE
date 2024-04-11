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
exports.Class = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const class_enum_1 = require("../enum/class.enum");
let Class = class Class {
};
exports.Class = Class;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Class.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(4, 100),
    __metadata("design:type", String)
], Class.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(5, 100),
    __metadata("design:type", String)
], Class.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(5, 100),
    __metadata("design:type", String)
], Class.prototype, "basis", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(5, 100),
    __metadata("design:type", String)
], Class.prototype, "operate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: class_enum_1.State,
        default: class_enum_1.State.Running
    }),
    (0, class_validator_1.IsEnum)(class_enum_1.State, { message: "Invalid State. Must be one of 'running', 'new', 'finished', 'pending', 'preparing'." }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Class.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], Class.prototype, "start", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Class.prototype, "countTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Class.prototype, "mostLesson", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array' }),
    __metadata("design:type", Array)
], Class.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Class.prototype, "teachers", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], Class.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], Class.prototype, "updatedAt", void 0);
exports.Class = Class = __decorate([
    (0, typeorm_1.Entity)()
], Class);
//# sourceMappingURL=class.entities.js.map