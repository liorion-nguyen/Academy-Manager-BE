<<<<<<< HEAD
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
=======
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
>>>>>>> 176a68f70f82014d60fd9fdd92d6b400ab8944f7
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

    @Post('token')
    async checkAccesstoken(@Body('access') access:string) {
        return this.authService.checkAccesstoken(access);
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
