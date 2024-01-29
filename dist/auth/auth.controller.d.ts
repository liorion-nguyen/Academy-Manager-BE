import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    checkAccesstoken(access: string): Promise<import("../user/entities/user.entity").User>;

    refreshTokens(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
