import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
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
}
