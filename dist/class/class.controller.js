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
exports.ClassController = void 0;
const common_1 = require("@nestjs/common");
const class_service_1 = require("./class.service");
const class_entities_1 = require("./entities/class.entities");
let ClassController = class ClassController {
    constructor(classService) {
        this.classService = classService;
    }
    async findAllPeople(people) {
        return this.classService.findAllPeople(people);
    }
    async findAll() {
        return this.classService.findAll();
    }
    findOne(id) {
        return this.classService.findOne(id);
    }
    async create(item) {
        try {
            if (item.id) {
                throw new common_1.BadRequestException('No user ID is required!');
            }
            return this.classService.create(item);
        }
        catch (error) {
            console.error('Validation Error:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Invalid user data', error.message);
        }
    }
    update(id, item) {
        return this.classService.update(id, item);
    }
    remove(id) {
        return this.classService.remove(id);
    }
};
exports.ClassController = ClassController;
__decorate([
    (0, common_1.Get)('/people/:people'),
    __param(0, (0, common_1.Param)('people')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "findAllPeople", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [class_entities_1.Class]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "remove", null);
exports.ClassController = ClassController = __decorate([
    (0, common_1.Controller)('class'),
    __metadata("design:paramtypes", [class_service_1.ClassService])
], ClassController);
//# sourceMappingURL=class.controller.js.map