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
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findByemail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
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
        console.log({
            access_token: accessToken,
            refresh_token: refreshToken,
        });
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
    }
    async getUserFromAccessToken(accessToken) {
        try {
            const jwtParts = accessToken.split('.');
            if (jwtParts.length !== 3) {
                throw new Error('Invalid Access Token');
            }
            const encodedPayload = jwtParts[1];
            const decodedPayload = Buffer.from(encodedPayload, 'base64').toString('utf-8');
            const data = JSON.parse(decodedPayload);
            const user = await this.userService.findByemail(data.email);
            return {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                role: user.role,
                gender: user.gender,
                address: user.address,
                avatar: user.avatar,
                isActive: true
            };
        }
        catch (error) {
            return false;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map