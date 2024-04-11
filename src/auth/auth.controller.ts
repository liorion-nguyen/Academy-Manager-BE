import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.body);
    }

    @Post('refresh')
    async refreshTokens(@Request() req) {
        const { refresh_token } = req.body;
        return this.authService.refreshTokens(refresh_token);
    }

    @Post('token')
    async checkToken(@Request() req) {
        try {
            const accessToken = req.body;
            const user = this.authService.getUserFromAccessToken(accessToken.access);
            return user;
        } catch (error) {
            return false;
        }
    }
}
