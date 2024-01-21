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
exports.LoginTimeMiddleware = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user.service");
let LoginTimeMiddleware = class LoginTimeMiddleware {
    constructor(userService) {
        this.userService = userService;
    }
    async use(req, res, next) {
        try {
            const userId = req.user.id;
            const user = await this.userService.findById(userId);
            if (user && user.isLoggedIn) {
                const currentTime = new Date();
                const lastLoginTime = user.lastLoginAt;
                const loginTimeDiff = currentTime.getTime() - lastLoginTime.getTime();
                if (loginTimeDiff > 30 * 60 * 1000) {
                    await this.userService.update(userId, { isLoggedIn: false });
                    return res.status(401).send('Session expired, please log in again.');
                }
                await this.userService.update(userId, { lastLoginAt: currentTime });
            }
            next();
        }
        catch (error) {
            console.error('Error in LoginTimeMiddleware:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
};
exports.LoginTimeMiddleware = LoginTimeMiddleware;
exports.LoginTimeMiddleware = LoginTimeMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], LoginTimeMiddleware);
//# sourceMappingURL=login-time.middleware.js.map