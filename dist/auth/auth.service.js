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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findByemail(email);

        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { sub: user.id, email: user.email };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.generateRefreshToken();
        this.saveTokensToDatabase(user.id, accessToken, refreshToken);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
    generateRefreshToken() {
        const tokenLength = 32;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let refreshToken = '';
        for (let i = 0; i < tokenLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            refreshToken += characters[randomIndex];
        }
        return refreshToken;
    }
    saveTokensToDatabase(userId, accessToken, refreshToken) {
        this.userService.saveTokens(userId, accessToken, refreshToken);
    }
    async refreshTokens(refreshToken) {
        const payload = this.jwtService.verify(refreshToken);
        const user = await this.userService.findByemail(payload.email);
        if (!user || user.refreshToken !== refreshToken) {
            throw new common_1.UnauthorizedException();
        }
        const newAccessToken = this.jwtService.sign({
            sub: user.id,
            email: user.email,
        });
        return {
            access_token: newAccessToken,
            refresh_token: refreshToken,
        };
    }
    async checkAccesstoken(accessToken) {
        try {
            const user = await this.userService.findByAccess(accessToken);
            delete user.createdAt;
            delete user.updatedAt;
            delete user.isLoggedIn;
            delete user.lastLoginAt;
            delete user.refreshToken;
            delete user.accessToken;
            return user;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Accesstoken not found');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map