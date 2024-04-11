import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    getUserFromAccessToken(access: string): Promise<false | {
        id: string;
        fullName: string;
        email: string;
        phone: string;
        role: import("../user/enum/user.enum").Role;
        gender: import("../user/enum/user.enum").Gender;
        address: string;
        avatar: string;
        isActive: boolean;
    }>;
    refreshTokens(req: any): Promise<void>;
    checkToken(req: any): Promise<false | {
        id: string;
        fullName: string;
        email: string;
        phone: string;
        role: import("../user/enum/user.enum").Role;
        gender: import("../user/enum/user.enum").Gender;
        address: string;
        avatar: string;
        isActive: boolean;
    }>;
}
