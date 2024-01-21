// auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { sub: user.id, username: user.username };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.generateRefreshToken();
        this.saveTokensToDatabase(user.id, accessToken, refreshToken); // Lưu refresh token vào cơ sở dữ liệu
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    private generateRefreshToken(): string {
        // Sử dụng một thư viện để tạo refresh token ngẫu nhiên và duy nhất
        const tokenLength = 32;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let refreshToken = '';
        for (let i = 0; i < tokenLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            refreshToken += characters[randomIndex];
        }
        return refreshToken;
    }

    private saveTokensToDatabase(userId: number, accessToken: string, refreshToken: string) {
        // Lưu access token và refresh token vào cơ sở dữ liệu
        this.userService.saveTokens(userId, accessToken, refreshToken);
    }

    async refreshTokens(refreshToken: string) {
        const payload = this.jwtService.verify(refreshToken);
        const user = await this.userService.findByUsername(payload.username);
        if (!user || user.refreshToken !== refreshToken) {
            throw new UnauthorizedException();
        }
        const newAccessToken = this.jwtService.sign({
            sub: user.id,
            username: user.username,
        });
        return {
            access_token: newAccessToken,
            refresh_token: refreshToken,
        };
    }
}
